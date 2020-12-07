import { Accomodation } from './accomodation.model';

export class User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN,
  PLAYER
}
