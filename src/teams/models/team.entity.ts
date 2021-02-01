import { CourseEntity } from 'src/courses/models/course.entity';
import { IUser } from 'src/users/models/user.interface';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ITeam } from './team.interface';

@Entity({ name: 'teams' })
export class TeamEntity implements ITeam {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'int' })
  public number: number;

  @Column({ type: 'character varying', length: 255 })
  public password: string;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'course_id' })
  public courseId: string;

  public members?: IUser[];
}
