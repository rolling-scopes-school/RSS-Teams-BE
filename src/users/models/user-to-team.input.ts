import { Field, InputType } from '@nestjs/graphql';

import { IUserFromTeam, IUserToTeam } from './user.interface';

@InputType()
export class AddUserToTeamInput implements IUserToTeam {
  @Field()
  public userId: string;

  @Field()
  public courseId: string;

  @Field()
  public teamPassword: string;
}

@InputType()
export class RemoveUserFromTeamInput implements IUserFromTeam {
  @Field()
  public userId: string;

  @Field()
  public teamId: string;
}
