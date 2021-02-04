import { Field, InputType } from '@nestjs/graphql';

import { ICreateTeam, IUpdateTeam } from './team.interface';

@InputType()
export class CreateTeamInput implements ICreateTeam {
  @Field()
  public tgLink: string;

  @Field()
  public courseId: string;
}

@InputType()
export class UpdateTeamInput implements IUpdateTeam {
  @Field()
  public id: string;

  @Field()
  public tgLink: string;
}
