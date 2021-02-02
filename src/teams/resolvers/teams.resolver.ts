import { Course } from 'src/courses/models/course.object-type';
import { CoursesService } from 'src/courses/services/courses.service';
import { User } from 'src/users/models/user.object-type';
import { UsersService } from 'src/users/services/users.service';

import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Team } from '../models/team.object-type';
import { TeamsService } from '../services/teams.service';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly coursesService: CoursesService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Team], { nullable: true })
  public async teams(): Promise<Team[]> {
    return this.teamsService.findAll();
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
}
