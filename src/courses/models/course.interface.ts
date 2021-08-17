export interface ICourse {
  id: string;
  name?: string;
  isActive?: boolean;
  teamSize?: number;
  teamIds?: string[];
  userIds?: string[];
}

export type ICreateCourseDTO = Partial<ICourse>;

export type IUpdateCourseDTO = Partial<ICourse>;
