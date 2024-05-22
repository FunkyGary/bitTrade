export interface User {
  id: string;
  name: string;
  image: string;
  email: string;
  username: string;
  bio: string;
  [key: string]: unknown;
}
