export interface ITeam {
  id: string;
  number: number;
  password: string;
  courseId: string;
  socialLink: string;
  memberIds: string[];
}

export type ICreateTeamDTO = Pick<ITeam, 'courseId' | 'socialLink'>;

export type IUpdateTeamDTO = Pick<ITeam, 'id' | 'socialLink'>;
