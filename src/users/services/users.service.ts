import { Connection, Like, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../models/user.entity';
import { IUser } from '../models/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly connection: Connection,
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

  public async updateUser(data: Partial<IUser>): Promise<UserEntity> {
    const { id, courseIds, ...user } = data;
    await this.usersRepository.update(id, { ...user });

    const findUser: Promise<UserEntity> = this.usersRepository.findOne(data.id, {
      loadRelationIds: true,
    });

    const userEntity: UserEntity = await findUser;

    courseIds?.forEach(async item => {
      await this.connection
        .createQueryBuilder()
        .relation(UserEntity, 'courseIds')
        .of(userEntity)
        .add(item);
    });

    return findUser;
  }
}
