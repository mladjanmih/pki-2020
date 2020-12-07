import { EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthenticationEvent } from 'src/app/events/authentication.event';
import { User } from 'src/app/models/user.model';

export class AuthenticationService {
  protected _isAuthenticated: boolean;
  protected authenticatedUser: User;

  constructor() {
    this.authenticatedUser = null;
  }

  login(username: string, password: string): Observable<User>  {
    throw "Not implemented.";
  }

  logout(): void {
    throw "Not implemented.";
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public authenticate(): User {
    return this.authenticatedUser;
  }
}
