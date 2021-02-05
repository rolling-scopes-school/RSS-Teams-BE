import { Field, InputType } from '@nestjs/graphql';

import { IAddUserToTeam } from './user.interface';

@InputType()
export class AddUserToTeamInput implements IAddUserToTeam {
  @Field()
  public userId: string;

  @Field()
  public courseId: string;

  @Field()
  public teamPassword: string;
}
