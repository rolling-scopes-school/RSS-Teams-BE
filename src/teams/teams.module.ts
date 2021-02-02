import { CourseEntity } from 'src/courses/models/course.entity';
import { CoursesService } from 'src/courses/services/courses.service';
import { UserEntity } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/services/users.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamEntity } from './models/team.entity';
import { TeamsResolver } from './resolvers/teams.resolver';
import { TeamsService } from './services/teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, CourseEntity, UserEntity])],
  providers: [TeamsService, TeamsResolver, CoursesService, UsersService],
})
export class TeamsModule {}
