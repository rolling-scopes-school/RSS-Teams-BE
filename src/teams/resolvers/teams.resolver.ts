import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Course } from 'src/courses/models/course.object-type';
import { CoursesService } from 'src/courses/services/courses.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IEntityList } from 'src/shared/models/entity-list.interface';
import { PaginationInput } from 'src/shared/models/pagination.input-type';
import { IPagination } from 'src/shared/models/pagination.interface';
import { User } from 'src/users/models/user.object-type';
import { UsersService } from 'src/users/services/users.service';

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateTeamInput, UpdateTeamInput } from '../models/team.input-type';
import { ICreateTeamDTO, IUpdateTeamDTO } from '../models/team.interface';
import { Team } from '../models/team.object-type';
import { Teams } from '../models/teams.object-type';
import { TeamsService } from '../services/teams.service';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly coursesService: CoursesService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => Teams, { nullable: true })
  @UseGuards(GqlAuthGuard)
  public async teams(
    @Args('pagination', { type: () => PaginationInput }) pagination: IPagination,
    @Args('courseId', { type: () => String }) courseId: string,
  ): Promise<IEntityList<Team>> {
    return this.teamsService.findAll({ pagination, courseId });
  }

  @ResolveField(() => Course, { name: 'course', nullable: true })
  public async course(@Parent() team: Team): Promise<Course> {
    const { courseId } = team;

    return this.coursesService.findById(courseId);
  }

  @ResolveField(() => [User], { name: 'members', nullable: true })
  public async users(@Parent() team: Team): Promise<User[]> {
    const { memberIds } = team;

    return this.usersService.findByIds(memberIds);
  }

  @Mutation(() => Team, { name: 'createTeam' })
  @UseGuards(GqlAuthGuard)
  public async createTeam(
    @Args({ name: 'team', type: () => CreateTeamInput }) team: ICreateTeamDTO,
  ): Promise<Team> {
    return this.teamsService.createTeam(team);
  }

  @Mutation(() => Team, { name: 'updateTeam' })
  @UseGuards(GqlAuthGuard)
  public async updateTeam(
    @Args({ name: 'team', type: () => UpdateTeamInput }) team: IUpdateTeamDTO,
  ): Promise<Team> {
    return this.teamsService.updateTeam(team);
  }
}
