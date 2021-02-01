import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Course } from '../../courses/models/course.object-type';
import { IUser } from './user.interface';

@ObjectType()
export class User implements IUser {
  @Field()
  public id: string;

  @Field({ nullable: true })
  public firstName?: string;

  @Field({ nullable: true })
  public lastName?: string;

  @Field({ nullable: true })
  public github?: string;

  @Field({ nullable: true })
  public telegram?: string;

  @Field({ nullable: true })
  public discord?: string;

  @Field(() => Int, { defaultValue: 1000 })
  public score: number;

  @Field({ nullable: true })
  public country?: string;

  @Field({ nullable: true })
  public city?: string;

  @Field({ defaultValue: false })
  public isAdmin: boolean;

  @Field(() => [Course], { nullable: true })
  public courses?: Course[];
}
