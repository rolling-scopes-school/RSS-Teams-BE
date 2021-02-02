import { CourseEntity } from 'src/courses/models/course.entity';
import { CoursesService } from 'src/courses/services/courses.service';
import { TeamEntity } from 'src/teams/models/team.entity';
import { TeamsService } from 'src/teams/services/teams.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './models/user.entity';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CourseEntity, TeamEntity])],
  providers: [UsersResolver, UsersService, CoursesService, TeamsService],
})
export class UsersModule {}
