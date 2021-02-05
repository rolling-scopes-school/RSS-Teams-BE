import { Field, InputType } from '@nestjs/graphql';

import { IAddUserToTeamDTO, IRemoveUserFromTeamDTO } from './user.interface';

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
