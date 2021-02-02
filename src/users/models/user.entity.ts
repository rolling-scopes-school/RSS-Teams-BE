import { CourseEntity } from 'src/courses/models/course.entity';
import { TeamEntity } from 'src/teams/models/team.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from './user.interface';

@Entity({ name: 'users' })
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'first_name', nullable: true, type: 'character varying', length: 255 })
  public firstName?: string;

  @Column({ name: 'last_name', nullable: true, type: 'character varying', length: 255 })
  public lastName?: string;

  @Column({ nullable: true, type: 'character varying', length: 255 })
  public github?: string;

  @Column({ nullable: true, type: 'character varying', length: 255 })
  public telegram?: string;

  @Column({ nullable: true, type: 'character varying', length: 255 })
  public discord?: string;

  @Column({ default: 1000, type: 'int' })
  public score: number;

  @Column({ nullable: true, type: 'character varying', length: 255 })
  public country?: string;

  @Column({ nullable: true, type: 'character varying', length: 255 })
  public city?: string;

  @Column({ name: 'is_admin', default: false, type: 'boolean' })
  public isAdmin: boolean;

  @ManyToMany(() => CourseEntity, { nullable: true })
  @JoinTable({
    name: 'users_courses',
  })
  public courseIds: string[];

  @ManyToMany(() => TeamEntity, { nullable: true })
  @JoinTable({
    name: 'users_teams',
  })
  public teamIds: string[];
}
