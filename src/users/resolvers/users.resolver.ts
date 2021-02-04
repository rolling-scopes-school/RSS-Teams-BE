import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Course } from 'src/courses/models/course.object-type';
import { CoursesService } from 'src/courses/services/courses.service';
import { Team } from 'src/teams/models/team.object-type';
import { TeamsService } from 'src/teams/services/teams.service';
import { User } from 'src/users/models/user.object-type';

import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

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
}
