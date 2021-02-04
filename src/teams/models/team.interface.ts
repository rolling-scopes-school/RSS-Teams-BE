export interface ITeam {
  id: string;
  number: number;
  password: string;
  courseId: string;
  tgLink: string;
  memberIds: string[];
}

export type ICreateTeam = Pick<ITeam, 'courseId' | 'tgLink'>;

export type IUpdateTeam = Pick<ITeam, 'id' | 'tgLink'>;
