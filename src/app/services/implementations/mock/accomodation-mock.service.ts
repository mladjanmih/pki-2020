import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { Accomodation } from 'src/app/models/accomodation.model';
import { ChangeRequest } from 'src/app/models/change-request.model';
import { Comment } from 'src/app/models/comment.model';
import { ResourceReviews } from 'src/app/models/resource-reviews.model';
import { UserAccomodation } from 'src/app/models/user-accomodation.model';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { AccomodationService } from '../../contracts/accomodation.service';

@Injectable({
  providedIn: 'root'
})
export class AccomodationMockService extends AccomodationService {

  private accomodations: {[key: number]: Accomodation} = {
    1: {
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

  private userAccomodations: {[key: string]: UserAccomodation } = {
    "user" : {
      accomodationId: 1,
      room: "Block III, Room 346"
    }
  }


  private accomodationComments: {[key: number]: ResourceReviews} = {
    1 : new ResourceReviews([
      new Comment("Anonymous", new Date(2020, 11, 23), 5,"This is great!"),
      new Comment("Ivana Spanovic", new Date(2020, 10, 23), 3, "It would be better if toilets are new as everything else!"),
      new Comment("Michael Phelps", new Date(2020, 11, 23), 5, "This complex is really great. The swimming pool is nearby and parties are great. I love Serbia!"),
      new Comment("Roger Federer", new Date(2020, 11, 23), 4, "It is not like in Switzerland. It is a combination of Zurich and communist Bratislava!"),
      new Comment("Anonymous", new Date(2020, 11, 23), 5, "Great!"),
    ]),
    2 : new ResourceReviews ([
      new Comment("Anonymous", new Date(2020, 11, 23), 5, "This is great!"),
      new Comment("Ivana Spanovic", new Date(2020, 10, 23), 3,"It would be better if toilets are new as everything else!"),
      new Comment("Michael Phelps", new Date(2020, 11, 23), 3, "This complex is really great. The swimming pool is nearby and parties are great. I love Serbia!"),
      new Comment("Roger Federer", new Date(2020, 11, 23), 4, "It is not like in Switzerland. It is a combination of Zurich and communist Bratislava!"),
      new Comment("Anonymous", new Date(2020, 11, 23), 5, "Great!"),
    ])
  };

  private accomodationChangeRequests: {[key: string]: ChangeRequest} = {

  }

  getAccomodation(id: number): Observable<Accomodation> {
    return new Observable<Accomodation>(subscriber => {
      if (this.accomodations[id]) {
        const acc = JSON.parse(JSON.stringify(this.accomodations[id])) as Accomodation;
        acc.rating = this.accomodationComments[id] ? this.accomodationComments[id].rating : 0;
        subscriber.next(acc);
      }
      else {
        subscriber.next(null);
      }
    }).pipe(first());
  }

  getUserAccomodation(username: string): Observable<Accomodation> {
    return new Observable<Accomodation>(subscriber => {
      if (this.userAccomodations[username]) {
        var clAcc = JSON.parse(JSON.stringify(this.accomodations[this.userAccomodations[username].accomodationId])) as Accomodation;
        clAcc.room = this.userAccomodations[username].room;
        clAcc.rating = this.accomodationComments[clAcc.id] ? this.accomodationComments[clAcc.id].rating : 0;
        subscriber.next(clAcc);
      }
      else {
        subscriber.next(null);
      }
    });
  }

  getComments(resourceId: number): Observable<Comment[]> {
    return new Observable<Comment[]>(subscriber => {
      if (this.accomodationComments[resourceId]) {
        subscriber.next(this.accomodationComments[resourceId].comments.filter(element => element.comment && element.comment !== ""));
      }
      else {
        subscriber.next(null);
      }
    });
  }

  getRating(resourceId: number): Observable<number> {
    return new Observable<number>(subscriber => {
      if (this.accomodationComments[resourceId]) {
        subscriber.next(this.accomodationComments[resourceId].rating);
      }
      else {
        subscriber.next(null);
      }
    });
  }

  putComment(resourceId: number, comment: Comment): Observable<Comment[]> {
    return new Observable<Comment[]>(subscriber => {
      if (this.accomodationComments[resourceId]) {
        this.accomodationComments[resourceId].addComment(comment);
        subscriber.next(this.accomodationComments[resourceId].comments.filter(element => element.comment && element.comment !== ""));
      }
      else {
        subscriber.next(null);
      }
    });
  }

  postChangeRequest(resourceId: number, username: string, reason: string): Observable<UserUpdateResult> {
    return new Observable<UserUpdateResult>(subscriber => {
      if (this.accomodationChangeRequests[username]) {
        subscriber.next(new UserUpdateResult(false, "Change request already submitted!"));
      }
      else {
        this.accomodationChangeRequests[username] = new ChangeRequest(username, resourceId, reason);
        subscriber.next(new UserUpdateResult(true));
      }
    });
  }
}
