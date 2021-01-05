import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { User, UserRole } from 'src/app/models/user.model';
import { UserService } from '../../contracts/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserMockService extends UserService {
  private users: { [key: string] : User} = {
    "novak.djokovic": {
      username: 'novak.djokovic',
      firstName: 'Novak',
      lastName: 'Djokovic',
      password: 'novak.No1',
      role: UserRole.PLAYER,
      country: 'Serbia',
      birthday: new Date(1986, 3, 21)
    },
    "andrea.lekic": {
      username: 'andrea.lekic',
      firstName: 'Andrea',
      lastName: 'Lekic',
      password: 'andrea.HB4ever',
      role: UserRole.PLAYER,
      country: 'Serbia',
      birthday: new Date(1989, 11, 8)
    },
    "user": {
      username: 'user',
      firstName: 'Demo',
      lastName: 'User',
      password: 'user',
      role: UserRole.PLAYER,
      country: 'USA',
      birthday: new Date(1995, 7, 15)
    }
  }


  getUserByName(username: string): Observable<User> {
    return new Observable<User>(subscriber => {
      if (this.users[username]) {
        subscriber.next(this.users[username]);
      }
      else {
        subscriber.next(null);
      }
    });
  }

  patchUser(user: User): Observable<UserUpdateResult> {
    return new Observable<UserUpdateResult>(subscriber => {
      if (this.users[user.username]) {
        this.users[user.username] = user;
        this.onProfileUpdate.emit(user);
        subscriber.next(new UserUpdateResult(true));
      }
      else {
        subscriber.next(new UserUpdateResult(false, "User not found."));
      }
    });
  }

  changePassword(user: User, oldPassword: string, newPassword: string): Observable<UserUpdateResult> {
    return new Observable<UserUpdateResult>(subscriber => {
      if (this.users[user.username]) {
        if (this.users[user.username].password == oldPassword)
        {
          this.users[user.username].password = newPassword;
          this.onProfileUpdate.emit(user);
          subscriber.next(new UserUpdateResult(true));
        }
        else {
          subscriber.next(new UserUpdateResult(false, "Current password is not correct."));
        }
      }
      else {
        subscriber.next(new UserUpdateResult(false, "User not found."));
      }
    });
  }
}
