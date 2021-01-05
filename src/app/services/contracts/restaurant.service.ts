import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Restaurant } from 'src/app/models/restaurant.model';

export class RestaurantService {
  getRestaurant(id: number) : Observable<Restaurant> {
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
}
