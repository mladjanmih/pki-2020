import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from '../../contracts/restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantMockService extends RestaurantService {
  private restaurants: {[key: number]: Restaurant } = {
    1:{
      id: 1,
      name: 'Studentski Grad',
      address : 'Studentska 4',
      busLines: '77, 76, 75, 74, 611',
      phoneNumber: '011456832',
      rating: 4.1
    },
    2: {
      id: 2,
      name: 'Patris Lumumba',
      address : 'Ljubice Lukovic 1',
      busLines: '65, 66, 74',
      phoneNumber: '011461242',
      rating: 3.6
    }
  }

  private userRestaurants: {[key: string]: number } = {
    'user': 1 ,
    'novak.djokovic': 1 ,
    'andrea.lekic' : 2
  }

  getRestaurant(id: number) : Observable<Restaurant> {
    return new Observable<Restaurant>(subscriber => {
      if (this.restaurants[id]) {
        subscriber.next(this.restaurants[id]);
      }
      else {
        subscriber.next(null);
      }
    }).pipe(first());
  }

  getUserRestaurant(username: string): Observable<Restaurant>  {
    return new Observable<Restaurant>(subscriber => {
      if (this.userRestaurants[username]) {
        subscriber.next(this.restaurants[this.userRestaurants[username]]);
      }
      else {
        subscriber.next(null);
      }
    }).pipe(first());
  }
}
