import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Accomodation } from 'src/app/models/accomodation.model';
import { ChangeRequest } from 'src/app/models/change-request.model';
import { Comment } from 'src/app/models/comment.model';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { User } from 'src/app/models/user.model';

export class AccomodationService {
  accomodationsUpdated: EventEmitter<any> = new EventEmitter();
  getAccomodation(id: number): Observable<Accomodation> {
    throw "Not implemented.";
  }

  getAccomodations(): Observable<Accomodation[]> {
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

  postChangeRequest(resourceId: number, user: User, reason: string): Observable<UserUpdateResult> {
    throw "Not implemented.";
  }


  getChangeRequests():Observable<ChangeRequest[]> {
    throw "Not implemented.";
  }

  acceptChangeRequest(cr: ChangeRequest, accomodationId: number, room: string): Observable<UserUpdateResult> {
    throw "Not implemented."
  }

  rejectChangeRequest(cr: ChangeRequest) : Observable<UserUpdateResult>{
    throw "Not implemented."
  }
}
