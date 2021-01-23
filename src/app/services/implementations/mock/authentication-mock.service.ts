import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserRole } from 'src/app/models/user.model';
import { AuthenticationService } from '../../contracts/authentication.service';
import { UserService } from '../../contracts/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationMockService extends AuthenticationService implements OnDestroy {

    private subscription: Subscription;
    public constructor(private userService: UserService) {
      super();
    //  this._isAuthenticated = true;
    //   this.authenticatedUser =
    //   {
    //       username: 'user',
    //     firstName: 'Demo',
    //     lastName: 'User',
    //     password: 'user',
    //     role: UserRole.PLAYER,
    //     country: 'USA',
    //     birthday: new Date(1995, 7, 15)

    //   }

      this.subscription = this.userService.onProfileUpdate.subscribe((user: User) => {
        this.authenticatedUser = user;
      })

    }

    public login(username: string, password: string): Observable<User> {
      return this.userService.getUserByName(username)
        .pipe(map((user: User) => {
          if (user) {
            this._isAuthenticated = user.password === password;
            if (this._isAuthenticated) {
              this.authenticatedUser = user;
            }
          }

          return user;
        }));


    }

    public logout() {
      this._isAuthenticated = false;
      this.authenticatedUser = null;
    }

    public ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
