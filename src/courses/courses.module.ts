import { TeamEntity } from 'src/teams/models/team.entity';
import { TeamsService } from 'src/teams/services/teams.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseEntity } from './models/course.entity';
import { CoursesResolver } from './resolvers/courses.resolver';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, TeamEntity])],
  providers: [CoursesService, CoursesResolver, TeamsService],
})
export class CoursesModule {}
