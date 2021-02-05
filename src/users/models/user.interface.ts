export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  github?: string;
  avatar?: string;
  email?: string;
  telegram?: string;
  discord?: string;
  score: number;
  country?: string;
  city?: string;
  isAdmin: boolean;
  courseIds: string[];
  teamIds: string[];
}

export type IUpdateUserDTO = Partial<IUser>;

export interface IAddUserToTeamDTO {
  userId: string;
  courseId: string;
  teamPassword: string;
}

export interface IRemoveUserFromTeamDTO {
  userId: string;
  teamId: string;
}
