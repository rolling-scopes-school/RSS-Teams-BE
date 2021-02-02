import { Like, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../models/user.entity';

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
}
