export interface ITeam {
  id: string;
  number: number;
  password: string;
  courseId: string;
  tgLink: string;
  memberIds: string[];
}

export type ICreateTeamDTO = Pick<ITeam, 'courseId' | 'tgLink'>;

export type IUpdateTeamDTO = Pick<ITeam, 'id' | 'tgLink'>;
