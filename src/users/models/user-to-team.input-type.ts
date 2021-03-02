import { Field, InputType } from '@nestjs/graphql';

import { IAddUserToTeamDTO, IRemoveUserFromCourseDTO, IRemoveUserFromTeamDTO } from './user.interface';

@InputType()
export class AddUserToTeamInput implements IAddUserToTeamDTO {
  @Field()
  public userId: string;

  @Field()
  public courseId: string;

  @Field()
  public teamPassword: string;
}

@InputType()
export class RemoveUserFromTeamInput implements IRemoveUserFromTeamDTO {
  @Field()
  public userId: string;

  @Field()
  public teamId: string;
}

@InputType()
export class RemoveUserFromCourseInput implements IRemoveUserFromCourseDTO {
  @Field()
  public userId: string;

  @Field({ nullable: true })
  public teamId: string;

  @Field()
  public courseId: string;
}
