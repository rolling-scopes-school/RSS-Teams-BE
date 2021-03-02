import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Course } from 'src/courses/models/course.object-type';
import { CoursesService } from 'src/courses/services/courses.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IEntityList } from 'src/shared/models/entity-list.interface';
import { PaginationInput } from 'src/shared/models/pagination.input-type';
import { IPagination } from 'src/shared/models/pagination.interface';
import { Team } from 'src/teams/models/team.object-type';
import { TeamsService } from 'src/teams/services/teams.service';
import { User } from 'src/users/models/user.object-type';

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { UserFilterInput } from '../models/user-filter.input-type';
import { IUserFilter } from '../models/user-filter.interface';
import {
  AddUserToTeamInput,
  RemoveUserFromCourseInput,
  RemoveUserFromTeamInput,
} from '../models/user-to-team.input-type';
import { UpdateUserInput } from '../models/user.input-type';
import {
  IAddUserToTeamDTO,
  IRemoveUserFromCourseDTO,
  IRemoveUserFromTeamDTO,
  IUpdateUserDTO,
} from '../models/user.interface';
import { Users } from '../models/users.object-type';
import { UsersService } from '../services/users.service';

const FILTER_DEFAULT_VALUE: IUserFilter = {
  discord: null,
  github: null,
  location: null,
  courseName: null,
  sortingOrder: 'DESC',
  teamFilter: false,
};

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
    private readonly teamsService: TeamsService,
  ) {}

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  public async user(@Args('github', { type: () => String }) github: string): Promise<User> {
    return this.usersService.findOne(github);
  }

  @Query(() => Users, { nullable: true })
  @UseGuards(GqlAuthGuard)
  public async users(
    @Args('pagination', { type: () => PaginationInput }) pagination: IPagination,
    @Args('courseId', { type: () => String }) courseId: string,
    @Args('filter', {
      type: () => UserFilterInput,
      nullable: true,
      defaultValue: FILTER_DEFAULT_VALUE,
    })
    filter: IUserFilter,
  ): Promise<IEntityList<User>> {
    return this.usersService.findAll({
      pagination,
      courseId,
      filter,
    });
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  public whoAmI(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOne(user.github);
  }

  @ResolveField(() => [Course], { name: 'courses', nullable: true })
  public async courses(@Parent() user: User): Promise<Course[]> {
    const { courseIds } = user;

    return this.coursesService.findByIds(courseIds);
  }

  @ResolveField(() => [Team], { name: 'teams', nullable: true })
  public async teams(@Parent() user: User): Promise<Course[]> {
    const { teamIds } = user;

    return this.teamsService.findByIds(teamIds);
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UseGuards(GqlAuthGuard)
  public async updateUser(@Args({ name: 'user', type: () => UpdateUserInput }) user: IUpdateUserDTO): Promise<User> {
    return this.usersService.updateUser(user);
  }

  @Mutation(() => User, { name: 'addUserToTeam' })
  @UseGuards(GqlAuthGuard)
  public async addUserToTeam(
    @Args({ name: 'data', type: () => AddUserToTeamInput }) data: IAddUserToTeamDTO,
  ): Promise<User> {
    return this.usersService.addUserToTeam(data);
  }

  @Mutation(() => User, { name: 'removeUserFromTeam' })
  @UseGuards(GqlAuthGuard)
  public async removeUserFromTeam(
    @Args({ name: 'data', type: () => RemoveUserFromTeamInput }) data: IRemoveUserFromTeamDTO,
  ): Promise<User> {
    return this.usersService.removeUserFromTeam(data);
  }

  @Mutation(() => User, { name: 'removeUserFromCourse' })
  @UseGuards(GqlAuthGuard)
  public async removeUserFromCourse(
    @Args({ name: 'data', type: () => RemoveUserFromCourseInput }) data: IRemoveUserFromCourseDTO,
  ): Promise<User> {
    return this.usersService.removeUserFromCourse(data);
  }
}
