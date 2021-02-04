import { Like, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../models/user.entity';
import { IUser } from '../models/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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
}
