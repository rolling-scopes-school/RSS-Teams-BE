import { CourseEntity } from 'src/courses/models/course.entity';
import { CoursesService } from 'src/courses/services/courses.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamEntity } from './models/team.entity';
import { TeamsResolver } from './resolvers/teams.resolver';
import { TeamsService } from './services/teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, CourseEntity])],
  providers: [TeamsService, TeamsResolver, CoursesService],
})
export class TeamsModule {}
