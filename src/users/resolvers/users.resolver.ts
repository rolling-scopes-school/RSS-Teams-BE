import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Course } from 'src/courses/models/course.object-type';
import { CoursesService } from 'src/courses/services/courses.service';
import { Team } from 'src/teams/models/team.object-type';
import { TeamsService } from 'src/teams/services/teams.service';
import { User } from 'src/users/models/user.object-type';

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AddUserToTeamInput, RemoveUserFromTeamInput } from '../models/user-to-team.input';
import { UpdateUserInput } from '../models/user.input-type';
import { IUpdateUser, IUserFromTeam, IUserToTeam } from '../models/user.interface';
import { UsersService } from '../services/users.service';

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

  @Query(() => [User], { nullable: true })
  @UseGuards(GqlAuthGuard)
  public async users(): Promise<User[]> {
    return this.usersService.findAll();
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
  public async updateUser(
    @Args({ name: 'user', type: () => UpdateUserInput }) user: IUpdateUser,
  ): Promise<User> {
    return this.usersService.updateUser(user);
  }

  @Mutation(() => User, { name: 'addUserToTeam' })
  @UseGuards(GqlAuthGuard)
  public async addUserToTeam(
    @Args({ name: 'data', type: () => AddUserToTeamInput }) data: IUserToTeam,
  ): Promise<User> {
    return this.usersService.addUserToTeam(data);
  }

  @Mutation(() => User, { name: 'removeUserFromTeam' })
  @UseGuards(GqlAuthGuard)
  public async removeUserFromTeam(
    @Args({ name: 'data', type: () => RemoveUserFromTeamInput }) data: IUserFromTeam,
  ): Promise<User> {
    return this.usersService.removeUserFromTeam(data);
  }
}
