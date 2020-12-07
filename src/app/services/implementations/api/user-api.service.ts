import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../contracts/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends UserService {

  constructor(private http: HttpClient) { super(); }

  getUserByName(username: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/users/${username}`);
  }
}
