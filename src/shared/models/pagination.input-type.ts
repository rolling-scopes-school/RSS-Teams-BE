import { Field, InputType, Int } from '@nestjs/graphql';

import { IPagination } from './pagination.interface';

@InputType()
export class PaginationInput implements IPagination {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  public skip: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  public take: number;
}
