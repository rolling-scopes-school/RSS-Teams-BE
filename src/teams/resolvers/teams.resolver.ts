import { Course } from 'src/courses/models/course.object-type';
import { CoursesService } from 'src/courses/services/courses.service';

import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Team } from '../models/team.object-type';
import { TeamsService } from '../services/teams.service';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly coursesService: CoursesService,
  ) {}

  @Query(() => [Team], { nullable: true })
  public async teams(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @ResolveField(() => Course, { name: 'course' })
  public async course(@Parent() team: Team): Promise<Course> {
    const { courseId } = team;

    return this.coursesService.findById(courseId);
  }
}
