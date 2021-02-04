import { Field, InputType } from '@nestjs/graphql';

import { IUpdateUser } from './user.interface';

@InputType()
export class UpdateUserInput implements IUpdateUser {
  @Field()
  public id: string;

  @Field({ nullable: true })
  public firstName?: string;

  @Field({ nullable: true })
  public lastName?: string;

  @Field({ nullable: true })
  public email?: string;

  @Field({ nullable: true })
  public telegram?: string;

  @Field({ nullable: true })
  public discord?: string;

  @Field({ nullable: true })
  public score?: number;

  @Field({ nullable: true })
  public country?: string;

  @Field({ nullable: true })
  public city?: string;

  @Field(() => [String], { nullable: true })
  public courseIds?: string[];
}
