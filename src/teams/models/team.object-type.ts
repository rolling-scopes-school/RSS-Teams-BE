import { Field, Int, ObjectType } from '@nestjs/graphql';

import { ITeam } from './team.interface';

@ObjectType()
export class Team implements ITeam {
  @Field()
  public id: string;

  @Field(() => Int)
  public number: number;

  @Field()
  public password: string;

  @Field()
  public courseId: string;

  @Field()
  public tgLink: string;

  @Field(() => [String], { nullable: true })
  public memberIds: string[];
}
