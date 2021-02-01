import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CourseEntity } from '../models/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
  ) {}

  public findAll(): Promise<CourseEntity[]> {
    return this.coursesRepository.find({ loadRelationIds: true });
  }

  public findById(id: string): Promise<CourseEntity> {
    return this.coursesRepository.findOne(
      { id },
      {
        loadRelationIds: true,
        join: {
          alias: 'course',
          leftJoinAndSelect: {
            teamIds: 'course.teamIds',
          },
        },
      },
    );
  }
}
