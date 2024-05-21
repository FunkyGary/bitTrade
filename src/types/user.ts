export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  username: string;
  bio: string;
  [key: string]: unknown;
}
