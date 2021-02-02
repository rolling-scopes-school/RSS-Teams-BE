import { Field, ObjectType } from '@nestjs/graphql';

import { ICourse } from './course.interface';

@ObjectType()
export class Course implements ICourse {
  @Field()
  public id: string;

  @Field({ nullable: true })
  public name?: string;

  @Field(() => [String], { nullable: true })
  public teamIds?: string[];

  @Field(() => [String], { nullable: true })
  public userIds?: string[];
}
