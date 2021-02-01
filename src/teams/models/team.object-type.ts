

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from '../../users/models/user.object-type';
import { ITeam } from './team.interface';

@ObjectType()
export class Team implements ITeam {
  @Field()
  public id: string;

  @Field(() => Int)
  public number: number;

  @Field()
  public password: string;

  @Field(() => [User], { nullable: true })
  public members?: User[];

  @Field()
  public courseId: string;
}
