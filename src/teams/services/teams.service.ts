import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TeamEntity } from '../models/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private teamsRepository: Repository<TeamEntity>,
  ) {}

  public findAll(): Promise<TeamEntity[]> {
    return this.teamsRepository.find({
      loadRelationIds: true,
    });
  }

  public findByIds(ids: string[]): Promise<TeamEntity[]> {
    return this.teamsRepository.findByIds(ids, { loadRelationIds: true });
  }
}
