import { TeamEntity } from 'src/teams/models/team.entity';
import { TeamsService } from 'src/teams/services/teams.service';
import { UserEntity } from 'src/users/models/user.entity';
import { getRepository, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CourseEntity } from '../models/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
    private readonly teamsService: TeamsService,
  ) {}

  public findAll(): Promise<CourseEntity[]> {
    return this.coursesRepository.find({ loadRelationIds: true, order: { name: 'DESC' } });
  }

  public findByIds(ids: string[]): Promise<CourseEntity[]> {
    return this.coursesRepository.findByIds(ids, { loadRelationIds: true });
  }

  public async sortStudents(courseId: string): Promise<boolean> {
    const MAX_TEAM_MEMBERS_NUMBER: number = 4;
    const teamRepo: Repository<TeamEntity> = getRepository(TeamEntity);
    const userIds: string[] = [];

    let currentTeamIndex: number = 0;
    let currentTeam: TeamEntity;

    try {
      const teams: TeamEntity[] = await teamRepo
        .createQueryBuilder()
        .select('team')
        .from(TeamEntity, 'team')
        .loadAllRelationIds()
        .where('team.courseId = :courseId', { courseId })
        .getMany();

      const filteredTeams: TeamEntity[] = teams.filter(team => {
        userIds.push(...team.memberIds);
        return team.memberIds?.length < MAX_TEAM_MEMBERS_NUMBER;
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

        await userRepo
          .createQueryBuilder()
          .relation(UserEntity, 'teamIds')
          .of(user)
          .add(currentTeam.id);

        if (currentTeam.memberIds.length >= MAX_TEAM_MEMBERS_NUMBER) {
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
