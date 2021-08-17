import { Field, InputType, Int } from '@nestjs/graphql';

import { ICreateCourseDTO, IUpdateCourseDTO } from './course.interface';

@InputType()
export class CreateCourseInput implements ICreateCourseDTO {
  @Field({ defaultValue: false })
  public name?: string;

  @Field({ nullable: true })
  public isActive?: boolean;

  @Field(() => Int, { defaultValue: 3 })
  public teamSize?: number;
}

@InputType()
export class UpdateCourseInput implements IUpdateCourseDTO {
  @Field()
  public id: string;

  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public isActive?: boolean;

  @Field(() => Int, { nullable: true })
  public teamSize?: number;
}
