import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Comment } from 'src/app/models/comment.model';
import { ResourceReviews } from 'src/app/models/resource-reviews.model';
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



  private restaurantComments: {[key: number]: ResourceReviews} = {
    1 : new ResourceReviews([
      new Comment("Anonymous", new Date(2020, 11, 23), 5, "This is great!"),
      new Comment("Ivana Spanovic", new Date(2020, 10, 23), 3,"It would be better if toilets are new as everything else!"),
      new Comment("Michael Phelps", new Date(2020, 11, 23), 3, "This complex is really great. The swimming pool is nearby and parties are great. I love Serbia!"),
      new Comment("Roger Federer", new Date(2020, 11, 23), 4, "It is not like in Switzerland. It is a combination of Zurich and communist Bratislava!"),
      new Comment("Anonymous", new Date(2020, 11, 23), 5, "Great!"),
    ]),
    2 : new ResourceReviews([
      new Comment("Anonymous", new Date(2020, 11, 23), 5, "This is great!"),
      new Comment("Ivana Spanovic", new Date(2020, 10, 23), 3,"It would be better if toilets are new as everything else!"),
      new Comment("Michael Phelps", new Date(2020, 11, 23), 3, "This complex is really great. The swimming pool is nearby and parties are great. I love Serbia!"),
      new Comment("Roger Federer", new Date(2020, 11, 23), 4, "It is not like in Switzerland. It is a combination of Zurich and communist Bratislava!"),
      new Comment("Anonymous", new Date(2020, 11, 23), 5, "Great!"),
    ])
  };

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


  getComments(resourceId: number): Observable<Comment[]> {
    return new Observable<Comment[]>(subscriber => {
      if (this.restaurantComments[resourceId]) {
        subscriber.next(this.restaurantComments[resourceId].comments.filter(element => element.comment && element.comment !== ""));
      }
      else {
        subscriber.next(null);
      }
    });
  }



  getRating(resourceId: number): Observable<number> {
    return new Observable<number>(subscriber => {
      if (this.restaurantComments[resourceId]) {
        subscriber.next(this.restaurantComments[resourceId].rating);
      }
      else {
        subscriber.next(null);
      }
    });
  }

  putComment(resourceId: number, comment: Comment): Observable<Comment[]> {
    return new Observable<Comment[]>(subscriber => {
      if (this.restaurantComments[resourceId]) {
        this.restaurantComments[resourceId].addComment(comment);
        subscriber.next(this.restaurantComments[resourceId].comments.filter(element => element.comment && element.comment !== ""));
      }
      else {
        subscriber.next(null);
      }
    });
  }
}
