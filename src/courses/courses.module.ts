import { TeamEntity } from 'src/teams/models/team.entity';
import { TeamsService } from 'src/teams/services/teams.service';
import { UserEntity } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/services/users.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseEntity } from './models/course.entity';
import { CoursesResolver } from './resolvers/courses.resolver';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, TeamEntity, UserEntity])],
  providers: [CoursesService, CoursesResolver, TeamsService, UsersService],
})
export class CoursesModule {}
