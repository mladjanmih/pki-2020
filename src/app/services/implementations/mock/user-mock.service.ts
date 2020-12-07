import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, UserRole } from 'src/app/models/user.model';
import { UserService } from '../../contracts/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserMockService implements UserService {
  private users: { [key: string] : User} = {
    "novak.djokovic": {
      username: 'novak.djokovic',
      firstName: 'Novak',
      lastName: 'Djokovic',
      password: 'novak.No1',
      role: UserRole.PLAYER,
    },
    "andrea.lekic": {
      username: 'andrea.lekic',
      firstName: 'Andrea',
      lastName: 'Lekic',
      password: 'andrea.HB4ever',
      role: UserRole.PLAYER
    },
    "user": {
      username: 'user',
      firstName: 'Demo',
      lastName: 'User',
      password: 'user',
      role: UserRole.PLAYER
    }
  }

  constructor() { }

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
}
