import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeRequest } from 'src/app/models/change-request.model';
import { Comment } from 'src/app/models/comment.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { User } from 'src/app/models/user.model';

export class RestaurantService {
  restaurantsUpdated: EventEmitter<any> = new EventEmitter();

  getRestaurant(id: number) : Observable<Restaurant> {
    throw "Not implemented.";
  }

  getRestaurants(): Observable<Restaurant[]> {
    throw "Not implemented.";
  }
  getUserRestaurant(username: string): Observable<Restaurant>  {
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
    throw "Not implemented";
  }


  acceptChangeRequest(cr: ChangeRequest, restaurantId: number): Observable<UserUpdateResult> {
    throw "Not implemented."
  }

  rejectChangeRequest(cr: ChangeRequest) : Observable<UserUpdateResult>{
    throw "Not implemented."
  }
}
