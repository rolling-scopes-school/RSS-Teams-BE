import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Team } from 'src/teams/models/team.object-type';
import { TeamsService } from 'src/teams/services/teams.service';
import { User } from 'src/users/models/user.object-type';
import { UsersService } from 'src/users/services/users.service';

import { CreateCourseInput, UpdateCourseInput } from '../models/course.input-type';
import { ICreateCourseDTO, IUpdateCourseDTO } from '../models/course.interface';
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
  @UseGuards(GqlAuthGuard)
  public async courses(
    @Args({ name: 'isActive', nullable: true, type: () => Boolean }) isActive: boolean,
  ): Promise<Course[]> {
    return this.courseService.findAll({ isActive });
  }

  @Query(() => Course, { nullable: true })
  @UseGuards(GqlAuthGuard)
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

  @Mutation(() => Boolean, { name: 'sortStudents' })
  @UseGuards(GqlAuthGuard)
  public async sortStudents(@Args({ name: 'courseId', type: () => String }) courseId: string): Promise<boolean> {
    return this.courseService.sortStudents(courseId);
  }

  @Mutation(() => Course, { name: 'createCourse' })
  @UseGuards(GqlAuthGuard)
  public async createUser(
    @Args({ name: 'course', type: () => CreateCourseInput }) course: ICreateCourseDTO,
  ): Promise<Course> {
    return this.courseService.createCourse(course);
  }

  @Mutation(() => Course, { name: 'updateCourse' })
  @UseGuards(GqlAuthGuard)
  public async updateUser(
    @Args({ name: 'course', type: () => UpdateCourseInput }) course: IUpdateCourseDTO,
  ): Promise<Course> {
    return this.courseService.updateCourse(course);
  }
}
