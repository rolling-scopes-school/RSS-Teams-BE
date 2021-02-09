export interface IUserFilter {
  discord: string;
  github: string;
  location: string;
  courseName: string;
  sortingOrder: 'ASC' | 'DESC';
  teamFilter: boolean;
}
