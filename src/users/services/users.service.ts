import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CourseEntity } from 'src/courses/models/course.entity';
import { CoursesService } from 'src/courses/services/courses.service';
import { IEntityList } from 'src/shared/models/entity-list.interface';
import { IPagination } from 'src/shared/models/pagination.interface';
import { TeamEntity } from 'src/teams/models/team.entity';
import { ITeam } from 'src/teams/models/team.interface';
import { TeamsService } from 'src/teams/services/teams.service';
import { Connection, getRepository, Like, Repository } from 'typeorm';

import { IUserFilter } from '../models/user-filter.interface';
import { UserEntity } from '../models/user.entity';
import { IAddUserToTeamDTO, IRemoveUserFromCourseDTO, IRemoveUserFromTeamDTO, IUser } from '../models/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly connection: Connection,
    private readonly teamsService: TeamsService,
    private readonly coursesService: CoursesService,
  ) {}

  public async findAll(data: {
    pagination: IPagination;
    courseId: string;
    filter: IUserFilter;
  }): Promise<IEntityList<UserEntity>> {
    let teamIds: string[];

    if (data.filter.teamFilter) {
      const course: CourseEntity = await this.coursesService.findById(data.courseId);
      teamIds = course.teamIds;
    }

    const condition: string = this.getWhereString(data.filter, teamIds);
    const userRepo: Repository<UserEntity> = getRepository(UserEntity);
    const [users, count] = await userRepo
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .leftJoinAndSelect('user.teamIds', 'team')
      .leftJoinAndSelect('user.courseIds', 'course')
      .leftJoinAndSelect('user.courseIds', 'secondCourse')
      .where(`course.id = :id${condition}`, {
        id: data.courseId,
        courseName: `%${data.filter.courseName || ''}%`,
        discord: `%${data.filter.discord || ''}%`,
        github: `%${data.filter.github || ''}%`,
        city: `%${data.filter.location || ''}%`,
        country: `%${data.filter.location || ''}%`,
        teamIds: teamIds ? [...teamIds] : null,
      })
      .orderBy('user.score', data.filter.sortingOrder)
      .skip(data.pagination.skip)
      .take(data.pagination.take)
      .getManyAndCount();

    const results: UserEntity[] = users.map(user => ({
      ...user,
      courses: user.courseIds,
      teams: user.teamIds,
      courseIds: user.courseIds.map(course => course['id']),
      teamIds: user.teamIds.map(team => team['id']),
    }));

    return {
      count,
      results,
    };
  }

  public findByIds(ids: string[]): Promise<UserEntity[]> {
    return this.usersRepository.findByIds(ids, { loadRelationIds: true });
  }

  public findOne(github: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: { github: Like(`%${github}%`) },
      loadRelationIds: true,
    });
  }

  public createUser(data: Partial<IUser>): Promise<UserEntity> {
    const user: UserEntity = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  public async addUserToTeam(data: IAddUserToTeamDTO): Promise<UserEntity> {
    const { teamSize } = await this.coursesService.findById(data.courseId);
    const team: ITeam = await this.teamsService.findTeamByPassword(data.courseId, data.teamPassword);

    if (team) {
      if (team.memberIds?.length >= teamSize) {
        throw new Error('Maximum number of members reached');
      }

      await this.associateUserWithTeam(team, data.userId);
    }

    return this.usersRepository.findOne(data.userId, {
      loadRelationIds: true,
    });
  }

  public async removeUserFromTeam(data: IRemoveUserFromTeamDTO): Promise<UserEntity> {
    const userEntity: UserEntity = await this.usersRepository.findOne(data.userId, {
      loadRelationIds: true,
    });

    await this.connection.createQueryBuilder().relation(UserEntity, 'teamIds').of(userEntity).remove(data.teamId);

    const hasTeamMembers: Boolean = await this.teamsService.checkIfTeamMembersExist(data.teamId);

    if (!hasTeamMembers) {
      await this.teamsService.deleteTeam(data.teamId);
    }

    return this.usersRepository.findOne(data.userId, {
      loadRelationIds: true,
    });
  }

  public async removeUserFromCourse(data: IRemoveUserFromCourseDTO): Promise<UserEntity> {
    const userEntity: UserEntity = await this.usersRepository.findOne(data.userId, {
      loadRelationIds: true,
    });

    await this.connection.createQueryBuilder().relation(UserEntity, 'courseIds').of(userEntity).remove(data.courseId);

    if (data.teamId) {
      return this.removeUserFromTeam({
        teamId: data.teamId,
        userId: data.userId,
      });
    }

    return this.usersRepository.findOne(data.userId, {
      loadRelationIds: true,
    });
  }

  public async updateUser(data: Partial<IUser>): Promise<UserEntity> {
    const { id, courseIds, ...user } = data;
    await this.usersRepository.update(id, { ...user });

    const userEntity: UserEntity = await this.usersRepository.findOne(data.id, {
      loadRelationIds: true,
    });

    try {
      await this.connection.createQueryBuilder().relation(UserEntity, 'courseIds').of(userEntity).add(courseIds);
    } catch (error) {
      console.log(`updateUser:\n================================\n${JSON.stringify(error)}`);
    }

    return this.usersRepository.findOne(data.id, {
      loadRelationIds: true,
    });
  }

  private async associateUserWithTeam(team: TeamEntity, userId: string): Promise<void> {
    const userEntity: UserEntity = await this.usersRepository.findOne(userId, {
      loadRelationIds: true,
    });

    return this.connection.createQueryBuilder().relation(UserEntity, 'teamIds').of(userEntity).add(team.id);
  }

  private getWhereString(data: IUserFilter, teamIds: string[] = []): string {
    const courseNameCondition: string = 'secondCourse.name ILIKE :courseName';
    const discordCondition: string = 'user.discord ILIKE :discord';
    const githubCondition: string = 'user.github ILIKE :github';
    const locationCondition: string = '(user.city ILIKE :city OR user.country ILIKE :country)';
    const teamCondition: string =
      teamIds.reduce((acc, item, index) => `${acc}${index ? ',' : ''}'${item}'`, '(team.id NOT IN (') +
      ') OR team.id ISNULL)';

    const conditionMap: Map<string, string> = new Map([
      ['courseName', courseNameCondition],
      ['discord', discordCondition],
      ['github', githubCondition],
      ['location', locationCondition],
      ['teamFilter', teamCondition],
    ]);

    return Object.keys(data).reduce((acc, key) => {
      if (data[key] && conditionMap.has(key)) {
        return `${acc} AND ${conditionMap.get(key)}`;
      }
      return acc;
    }, '');
  }
}
