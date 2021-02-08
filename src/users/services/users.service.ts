import { IEntityList } from 'src/shared/models/entity-list.interface';
import { IPagination } from 'src/shared/models/pagination.interface';
import { ITeam } from 'src/teams/models/team.interface';
import { TeamsService } from 'src/teams/services/teams.service';
import { Connection, getRepository, Like, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../models/user.entity';
import { IAddUserToTeamDTO, IRemoveUserFromTeamDTO, IUser } from '../models/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly connection: Connection,
    private readonly teamsService: TeamsService,
  ) {}

  public async findAll(data: {
    pagination: IPagination;
    courseId: string;
  }): Promise<IEntityList<UserEntity>> {
    const userRepo: Repository<UserEntity> = getRepository(UserEntity);
    const [users, count] = await userRepo
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .loadAllRelationIds()
      .leftJoinAndSelect('user.courseIds', 'course')
      .where('course.id = :id', { id: data.courseId })
      .orderBy('user.score', 'ASC')
      .skip(data.pagination.skip)
      .take(data.pagination.take)
      .getManyAndCount();

    return {
      count: count,
      results: users,
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
    const team: ITeam = await this.teamsService.findTeamByPassword(
      data.courseId,
      data.teamPassword,
    );

    if (team) {
      const userEntity: UserEntity = await this.usersRepository.findOne(data.userId, {
        loadRelationIds: true,
      });

      await this.connection
        .createQueryBuilder()
        .relation(UserEntity, 'teamIds')
        .of(userEntity)
        .add(team.id);
    }

    return this.usersRepository.findOne(data.userId, {
      loadRelationIds: true,
    });
  }

  public async removeUserFromTeam(data: IRemoveUserFromTeamDTO): Promise<UserEntity> {
    const userEntity: UserEntity = await this.usersRepository.findOne(data.userId, {
      loadRelationIds: true,
    });

    await this.connection
      .createQueryBuilder()
      .relation(UserEntity, 'teamIds')
      .of(userEntity)
      .remove(data.teamId);

    const hasTeamMembers: Boolean = await this.teamsService.checkIfTeamMembersExist(data.teamId);

    if (!hasTeamMembers) {
      await this.teamsService.deleteTeam(data.teamId);
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

    courseIds?.forEach(async item => {
      await this.connection
        .createQueryBuilder()
        .relation(UserEntity, 'courseIds')
        .of(userEntity)
        .add(item);
    });

    return this.usersRepository.findOne(data.id, {
      loadRelationIds: true,
    });
  }
}
