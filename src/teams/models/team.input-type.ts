import { Field, InputType } from '@nestjs/graphql';

import { ICreateTeamDTO, IUpdateTeamDTO } from './team.interface';

@InputType()
export class CreateTeamInput implements ICreateTeamDTO {
  @Field()
  public socialLink: string;

  @Field()
  public courseId: string;
}

@InputType()
export class UpdateTeamInput implements IUpdateTeamDTO {
  @Field()
  public id: string;

  @Field()
  public socialLink: string;
}
