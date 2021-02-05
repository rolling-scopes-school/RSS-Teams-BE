import { IEntityList } from 'src/shared/models/entity-list.interface';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { IUser } from './user.interface';
import { User } from './user.object-type';

@ObjectType()
export class Users implements IEntityList<IUser> {
  @Field(() => Int)
  public count: number;

  @Field(() => [User])
  public results: IUser[];
}
