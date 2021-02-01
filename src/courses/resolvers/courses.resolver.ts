import { Team } from 'src/teams/models/team.object-type';
import { TeamsService } from 'src/teams/services/teams.service';

import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Course } from '../models/course.object-type';
import { CoursesService } from '../services/courses.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly courseService: CoursesService,
    private readonly teamsService: TeamsService,
  ) {}

  @Query(() => [Course], { nullable: true })
  public async courses(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @ResolveField(() => [Team], { name: 'teams' })
  public async teams(@Parent() course: Course): Promise<Team[]> {
    const { teamIds } = course;
    console.log('===================\n', course);

    return this.teamsService.findByIds(teamIds);
  }
}
