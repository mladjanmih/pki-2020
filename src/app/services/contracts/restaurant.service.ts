import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';

export class RestaurantService {
  getRestaurant(id: number) : Observable<Restaurant> {
    throw "Not implemented.";
  }

  getUserRestaurant(username: string): Observable<Restaurant>  {
    throw "Not implemented.";
  }
}
