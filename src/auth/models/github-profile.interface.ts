export interface IGitHubProfile {
  id: string;
  nodeId: string;
  displayName: string;
  username: string;
  profileUrl: string;
  emails: { value: string }[];
  photos: { value: string }[];
  provider: string;
}
