import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IEntityList } from 'src/shared/models/entity-list.interface';
import { IPagination } from 'src/shared/models/pagination.interface';
import { Connection, QueryRunner, Repository } from 'typeorm';

import { TeamEntity } from '../models/team.entity';
import { ICreateTeamDTO, IUpdateTeamDTO } from '../models/team.interface';
import { getNextTeamNumber } from '../utils/get-next-team-number.util';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private teamsRepository: Repository<TeamEntity>,
    private connection: Connection,
  ) {}

  public async findAll(data: { pagination: IPagination; courseId: string }): Promise<IEntityList<TeamEntity>> {
    const [teams, count] = await this.teamsRepository.findAndCount({
      where: {
        courseId: data.courseId,
      },
      loadRelationIds: true,
      skip: data.pagination.skip,
      take: data.pagination.take,
      order: { number: 'ASC' },
    });

    return {
      count,
      results: teams,
    };
  }

  public findByIds(ids: string[]): Promise<TeamEntity[]> {
    return this.teamsRepository.findByIds(ids, { loadRelationIds: true, order: { number: 'ASC' } });
  }

  public findTeamByPassword(courseId: string, password: string): Promise<TeamEntity> {
    return this.teamsRepository.findOne({ courseId, password }, { loadRelationIds: true });
  }

  public async createTeam(data: ICreateTeamDTO): Promise<TeamEntity> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    let team: TeamEntity;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const teams: TeamEntity[] = await this.teamsRepository.find({ courseId: data.courseId });
      const nextNumber: number = getNextTeamNumber(teams);
      const password: string = Math.random().toString(36).substr(2, 8);

      team = await queryRunner.manager.create(TeamEntity, {
        ...data,
        password,
        number: nextNumber,
      });

      team = await queryRunner.manager.save(team);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }

    return team;
  }

  public async updateTeam(data: IUpdateTeamDTO): Promise<TeamEntity> {
    await this.teamsRepository.update(data.id, { socialLink: data.socialLink });

    return this.teamsRepository.findOne(data.id, { loadRelationIds: true });
  }

  public async checkIfTeamMembersExist(id: string): Promise<boolean> {
    const team: TeamEntity = await this.teamsRepository.findOne(id, { loadRelationIds: true });

    return Boolean(team?.memberIds.length);
  }

  public async deleteTeam(id: string): Promise<void> {
    this.teamsRepository.delete({ id });
  }
}
