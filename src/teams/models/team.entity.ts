import { CourseEntity } from 'src/courses/models/course.entity';
import { UserEntity } from 'src/users/models/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ITeam } from './team.interface';

@Entity({ name: 'teams' })
export class TeamEntity implements ITeam {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'int' })
  public number: number;

  @Column({ type: 'character varying', length: 255 })
  public password: string;

  @Column({ type: 'character varying', length: 255, name: 'tg_link', nullable: true })
  public tgLink: string;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'course_id' })
  public courseId: string;

  @ManyToMany(() => UserEntity, { nullable: true })
  @JoinTable({
    name: 'users_teams',
  })
  public memberIds: string[];
}
