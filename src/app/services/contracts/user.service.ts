

import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { User } from 'src/app/models/user.model';

export class UserService {
  onProfileUpdate: EventEmitter<User> = new EventEmitter<User>();

  getUserByName(username: string) : Observable<User> {
    throw "Not implemented.";
  }

  patchUser(user: User): Observable<UserUpdateResult> {
    throw "Not implemented.";
  }

  changePassword(user: User, oldPassword: string, newPassword: string): Observable<UserUpdateResult> {
    throw "Not implemented.";
  }
}
