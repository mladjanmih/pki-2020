import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ChangeRequest } from 'src/app/models/change-request.model';
import { Comment } from 'src/app/models/comment.model';
import { ResourceReviews } from 'src/app/models/resource-reviews.model';
import { ResourceType } from 'src/app/models/resource-type.enum';
import { Restaurant } from 'src/app/models/restaurant.model';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { User } from 'src/app/models/user.model';
import { RestaurantService } from '../../contracts/restaurant.service';
import { UserService } from '../../contracts/user.service';

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
      rating: 4.1,
      images: [
        'https://www.studentskizivot.com/wp-content/uploads/2016/07/studentski-grad-1.jpg',
        'https://www.turizzam.com/upload/objects/1429784330_cpvLHw/Soba_1.jpg',
        'https://www.turizzam.com/upload/objects/1429784330_cpvLHw/soba_3.jpg'
      ]
    },
    2: {
      id: 2,
      name: 'Patris Lumumba',
      address : 'Ljubice Lukovic 1',
      busLines: '65, 66, 74',
      phoneNumber: '011461242',
      rating: 3.6,
      images: [
        'https://fakulteti.edukacija.rs/wp-content/uploads/2014/08/patris-lumumba-beograd-1.jpg',
        'https://www.kurir.rs/data/images/2017/09/04/14/1274871_studenjak-soba-studenti-foto-zorana-jevtic_ls.jpg'
      ]
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

  private restaurantChangeRequests: {[key: string]: ChangeRequest} = {
    "novak.djokovic": new ChangeRequest("novak.djokovic", "Novak", "Djokovic", 1, "Losa hrana", ResourceType.RESTAURANT),
    "user": new ChangeRequest("user", "Demo", "User", 2, "just testing the restaurant feature", ResourceType.RESTAURANT)
  }

  getRestaurants(): Observable<Restaurant[]> {
    return new Observable<Restaurant[]>(subscriber => {
      const res = [];
      for (let id in this.restaurants) {
        res.push(this.restaurants[id]);
      }
      subscriber.next(res);
    });
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

  postChangeRequest(resourceId: number, user: User, reason: string): Observable<UserUpdateResult> {
    return new Observable<UserUpdateResult>(subscriber => {
      if (!user) {
        subscriber.next(new UserUpdateResult(false, "User does not exists!"));
      }
      if (this.restaurantChangeRequests[user.username]) {
        subscriber.next(new UserUpdateResult(false, "Change request already submitted!"));
      }
      else {
        this.restaurantChangeRequests[user.username] = new ChangeRequest(user.username, user.firstName, user.lastName, resourceId, reason, ResourceType.RESTAURANT);
        subscriber.next(new UserUpdateResult(true));
      }
    });
  }

  getChangeRequests() : Observable<ChangeRequest[]> {
    return new Observable<ChangeRequest[]>(subscriber => {

      const cr = [];
      for(let key in this.restaurantChangeRequests) {
        cr.push(this.restaurantChangeRequests[key]);
      }

      subscriber.next(cr);
    });
  }

  acceptChangeRequest(cr: ChangeRequest, restaurantId: number): Observable<UserUpdateResult> {
    console.log(cr);
    console.log(restaurantId);
    return new Observable<UserUpdateResult>(subscriber => {
      console.log(cr);
      console.log(restaurantId);
      if (!cr || !restaurantId) {
        subscriber.next(new UserUpdateResult(false, "Input data not valid."));
        return;
      }


      if (this.userRestaurants[cr.username]) {
        this.userRestaurants[cr.username] = restaurantId;
        subscriber.next(new UserUpdateResult(true));
      }
      else {
        subscriber.next(new UserUpdateResult(false, "User does not have an accomodation."));
      }

      delete this.restaurantChangeRequests[cr.username];
      this.restaurantsUpdated.emit();
    });
  }

  rejectChangeRequest(cr: ChangeRequest): Observable<UserUpdateResult> {
    return new Observable<UserUpdateResult>(subscriber => {
      delete this.restaurantChangeRequests[cr.username];
      subscriber.next(new UserUpdateResult(true));
      this.restaurantsUpdated.emit();

    });
  }
}
