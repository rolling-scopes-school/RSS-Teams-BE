import { IUser } from 'src/users/models/user.interface';

export interface ITeam {
  id: string;
  number: number;
  password: string;
  courseId: string;
  members?: IUser[];
}
