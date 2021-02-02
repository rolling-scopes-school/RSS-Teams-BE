import { Course } from 'src/courses/models/course.object-type';
import { CoursesService } from 'src/courses/services/courses.service';
import { User } from 'src/users/models/user.object-type';

import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { UsersService } from '../services/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  @Query(() => User, { nullable: true })
  public async user(@Args('github', { type: () => String }) github: string): Promise<User> {
    return this.usersService.findOne(github);
  }

  @ResolveField(() => [Course], { name: 'courses' })
  public async courses(@Parent() user: User): Promise<Course[]> {
    console.log(user);
    const { courseIds } = user;

    return this.coursesService.findByIds(courseIds);
  }
}
