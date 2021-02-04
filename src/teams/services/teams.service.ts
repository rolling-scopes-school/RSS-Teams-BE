import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TeamEntity } from '../models/team.entity';
import { ICreateTeam, IUpdateTeam } from '../models/team.interface';
import { getNextTeamNumber } from '../utils/get-next-team-number.util';

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
    return this.teamsRepository.findByIds(ids, { loadRelationIds: true, order: { number: 'ASC' } });
  }

  public async createTeam(props: ICreateTeam): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.teamsRepository.find({ courseId: props.courseId });
    const nextNumber: number = getNextTeamNumber(teams);

    const team: TeamEntity = this.teamsRepository.create({
      ...props,
      password: Math.random().toString(36).substr(2, 8),
      number: nextNumber,
    });

    return this.teamsRepository.save(team);
  }

  public async updateTeam(props: IUpdateTeam): Promise<TeamEntity> {
    await this.teamsRepository.update(props.id, { tgLink: props.tgLink });

    return this.teamsRepository.findOne(props.id);
  }
}
