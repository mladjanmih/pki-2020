import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

export class UserService {
  getUserByName(username: string) : Observable<User> {
    throw "Not implemented.";
  }
}
