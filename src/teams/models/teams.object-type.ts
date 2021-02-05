import { IEntityList } from 'src/shared/models/entity-list.interface';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { ITeam } from './team.interface';
import { Team } from './team.object-type';

@ObjectType()
export class Teams implements IEntityList<ITeam> {
  @Field(() => Int)
  public count: number;

  @Field(() => [Team])
  public results: ITeam[];
}
