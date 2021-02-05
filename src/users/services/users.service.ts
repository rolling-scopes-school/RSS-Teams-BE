import { ITeam } from 'src/teams/models/team.interface';
import { TeamsService } from 'src/teams/services/teams.service';
import { Connection, Like, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../models/user.entity';
import { IUser, IUserFromTeam, IUserToTeam } from '../models/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly connection: Connection,
    private readonly teamsService: TeamsService,
  ) {}

  public findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({ loadRelationIds: true, order: { score: 'DESC' } });
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

  public async addUserToTeam(data: IUserToTeam): Promise<UserEntity> {
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

  public async removeUserFromTeam(data: IUserFromTeam): Promise<UserEntity> {
    const userEntity: UserEntity = await this.usersRepository.findOne(data.userId, {
      loadRelationIds: true,
    });

    await this.connection
      .createQueryBuilder()
      .relation(UserEntity, 'teamIds')
      .of(userEntity)
      .remove(data.teamId);

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
