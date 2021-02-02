import { Team } from 'src/teams/models/team.object-type';
import { TeamsService } from 'src/teams/services/teams.service';
import { User } from 'src/users/models/user.object-type';
import { UsersService } from 'src/users/services/users.service';

import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Course } from '../models/course.object-type';
import { CoursesService } from '../services/courses.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly courseService: CoursesService,
    private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Course], { nullable: true })
  public async courses(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Query(() => Course, { nullable: true })
  public async course(@Args('id', { type: () => String }) id: string): Promise<Course> {
    return this.courseService.findById(id);
  }

  @ResolveField(() => [Team], { name: 'teams' })
  public async teams(@Parent() course: Course): Promise<Team[]> {
    const { teamIds } = course;

    return this.teamsService.findByIds(teamIds);
  }

  @ResolveField(() => [User], { name: 'users' })
  public async users(@Parent() course: Course): Promise<User[]> {
    const { userIds } = course;

    return this.usersService.findByIds(userIds);
  }
}
