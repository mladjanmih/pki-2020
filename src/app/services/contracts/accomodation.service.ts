import { Observable } from 'rxjs';
import { Accomodation } from 'src/app/models/accomodation.model';
import { Comment } from 'src/app/models/comment.model';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';

export class AccomodationService {
  getAccomodation(id: number): Observable<Accomodation> {
    throw "Not implemented.";
  }

  getUserAccomodation(username: string): Observable<Accomodation>  {
    throw "Not implemented.";
  }

  getComments(resourceId: number): Observable<Comment[]> {
    throw "Not implemented.";
  }

  getRating(resourceId: number): Observable<number> {
    throw "Not implemented.";
  }

  putComment(resourceId: number, comment: Comment): Observable<Comment[]> {
    throw "Not implemented.";
  }

  postChangeRequest(resourceId: number, username: string, reason: string): Observable<UserUpdateResult> {
    throw "Not implemented.";
  }
}
