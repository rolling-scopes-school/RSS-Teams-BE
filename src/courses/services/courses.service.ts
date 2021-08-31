import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TeamEntity } from 'src/teams/models/team.entity';
import { TeamsService } from 'src/teams/services/teams.service';
import { UserEntity } from 'src/users/models/user.entity';
import { Any, getRepository, Repository } from 'typeorm';

import { CourseEntity } from '../models/course.entity';
import { ICourse } from '../models/course.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
    private readonly teamsService: TeamsService,
  ) {}

  public findAll({ isActive }: { isActive: boolean }): Promise<CourseEntity[]> {
    return this.coursesRepository.find({
      loadRelationIds: true,
      order: { name: 'DESC' },
      where: {
        isActive: isActive ?? Any([true, false]),
      },
    });
  }

  public findByIds(ids: string[]): Promise<CourseEntity[]> {
    return this.coursesRepository.findByIds(ids, { loadRelationIds: true });
  }

  public createCourse(data: Partial<ICourse>): Promise<CourseEntity> {
    const course: CourseEntity = this.coursesRepository.create(data);

    return this.coursesRepository.save(course);
  }

  public async updateCourse(data: Partial<ICourse>): Promise<CourseEntity> {
    const { id, ...course } = data;
    await this.coursesRepository.update(id, { ...course });

    return this.coursesRepository.findOne(data.id, {
      loadRelationIds: true,
    });
  }

  public async sortStudents(courseId: string): Promise<boolean> {
    const { teamSize } = await this.coursesRepository.findOne(courseId);
    const teamRepo: Repository<TeamEntity> = getRepository(TeamEntity);
    const userIds: string[] = [];

    let currentTeamIndex: number = 0;
    let currentTeam: TeamEntity;

    try {
      const teams: TeamEntity[] = await teamRepo
        .createQueryBuilder()
        .select('team')
        .from(TeamEntity, 'team')
        .leftJoinAndSelect('team.memberIds', 'user')
        .where('team.courseId = :courseId', { courseId })
        .getMany();

      const filteredTeams: TeamEntity[] = teams.filter(team => {
        userIds.push(...team.memberIds.map(user => user['id']));
        return team.memberIds?.length < teamSize;
      });

      const userIdsSet: Set<string> = new Set(userIds);
      const userRepo: Repository<UserEntity> = getRepository(UserEntity);

      const users: UserEntity[] = await userRepo
        .createQueryBuilder()
        .select('user')
        .from(UserEntity, 'user')
        .leftJoinAndSelect('user.courseIds', 'course')
        .where('course.id = :id', { id: courseId })
        .andWhere('user.isAdmin = :isAdmin', { isAdmin: false })
        .orderBy('user.score', 'ASC')
        .getMany();

      for (const user of users) {
        if (userIdsSet.has(user.id)) {
          continue;
        }

        currentTeam = await this.getOrCreateTeam(filteredTeams, currentTeamIndex, courseId);

        userIdsSet.add(user.id);

        if (currentTeam.memberIds) {
          currentTeam.memberIds.push(user.id);
        } else {
          currentTeam.memberIds = [user.id];
        }

        await userRepo.createQueryBuilder().relation(UserEntity, 'teamIds').of(user).add(currentTeam.id);

        if (currentTeam.memberIds.length >= teamSize) {
          currentTeamIndex++;
        }
      }

      return true;
    } catch (error) {
      return error;
    }
  }

  public findById(id: string): Promise<CourseEntity> {
    return this.coursesRepository.findOne(
      { id },
      {
        loadRelationIds: true,
      },
    );
  }

  private async getOrCreateTeam(
    filteredTeams: TeamEntity[],
    currentTeamIndex: number,
    courseId: string,
  ): Promise<TeamEntity> {
    let currentTeam: TeamEntity;

    if (filteredTeams[currentTeamIndex]) {
      currentTeam = filteredTeams[currentTeamIndex];
    } else {
      currentTeam = await this.teamsService.createTeam({
        courseId,
        socialLink: '',
      });

      filteredTeams.push(currentTeam);
    }

    return currentTeam;
  }
}
