import { Field, InputType } from '@nestjs/graphql';

import { IUserFilter } from './user-filter.interface';

@InputType()
export class UserFilterInput implements IUserFilter {
  @Field({ nullable: true })
  public discord: string;

  @Field({ nullable: true })
  public github: string;

  @Field({ nullable: true })
  public location: string;

  @Field({ nullable: true })
  public courseName: string;

  @Field({ nullable: true })
  public sortingOrder: 'ASC' | 'DESC';

  @Field({ nullable: true })
  public teamFilter: boolean;
}
