import { TeamEntity } from 'src/teams/models/team.entity';
import { UserEntity } from 'src/users/models/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ICourse } from './course.interface';

@Entity({ name: 'courses' })
export class CourseEntity implements ICourse {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'name', nullable: true, type: 'character varying', length: 255 })
  public name?: string;

  @Column({ name: 'is_active', default: false, type: 'boolean' })
  public isActive: boolean;

  @Column({ name: 'team_size', nullable: true, type: 'int' })
  public teamSize?: number;

  @OneToMany(() => TeamEntity, team => team.courseId)
  @JoinColumn({ name: 'teamIds' })
  public teamIds: string[];

  @ManyToMany(() => UserEntity, { nullable: true })
  @JoinTable({
    name: 'users_courses',
  })
  public userIds: string[];
}
