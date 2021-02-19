export interface ITeam {
  id: string;
  number: number;
  password: string;
  courseId: string;
  socialLink: string;
  memberIds: string[];
}

export interface ICreateTeamDTO extends Pick<ITeam, 'courseId' | 'socialLink'> {
  ownerId?: string;
}

export type IUpdateTeamDTO = Pick<ITeam, 'id' | 'socialLink'>;
