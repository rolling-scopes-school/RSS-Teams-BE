import { TeamEntity } from 'src/teams/models/team.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ICourse } from './course.interface';

@Entity({ name: 'courses' })
export class CourseEntity implements ICourse {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'name', nullable: true, type: 'character varying', length: 255 })
  public name?: string;

  @OneToMany(() => TeamEntity, team => team.courseId)
  @JoinColumn({ name: 'teamIds' })
  public teamIds: string[];
}
