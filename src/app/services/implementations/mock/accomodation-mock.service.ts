import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { Accomodation } from 'src/app/models/accomodation.model';
import { ChangeRequest } from 'src/app/models/change-request.model';
import { Comment } from 'src/app/models/comment.model';
import { ResourceReviews } from 'src/app/models/resource-reviews.model';
import { ResourceType } from 'src/app/models/resource-type.enum';
import { UserAccomodation } from 'src/app/models/user-accomodation.model';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { User } from 'src/app/models/user.model';
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

  private userAccomodations: {[key: string]: UserAccomodation } = {
    "user" : {
      accomodationId: 1,
      room: "Block III, Room 346"
    },
    "novak.djokovic": {
      accomodationId: 2,
      room: "Block II, Room 753"
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
    "novak.djokovic": new ChangeRequest("novak.djokovic", "Novak", "Djokovic", 1, "Los smestaj", ResourceType.ACCOMODATION),
    "user": new ChangeRequest("user", "Demo", "User", 2, "just testing the accomodation feature", ResourceType.ACCOMODATION)
  }
  getAccomodations(): Observable<Accomodation[]> {
    return new Observable<Accomodation[]>(subscriber => {
      const acc = [];
      for (let id in this.accomodations) {
        acc.push(this.accomodations[id]);
      }
      subscriber.next(acc);
    });
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

  postChangeRequest(resourceId: number, user: User, reason: string): Observable<UserUpdateResult> {
    return new Observable<UserUpdateResult>(subscriber => {
      if (this.accomodationChangeRequests[user.username]) {
        subscriber.next(new UserUpdateResult(false, "Change request already submitted!"));
      }
      else {
        this.accomodationChangeRequests[user.username] = new ChangeRequest(user.username, user.firstName, user.lastName, resourceId, reason, ResourceType.ACCOMODATION);
        subscriber.next(new UserUpdateResult(true));
      }
    });
  }

  getChangeRequests() : Observable<ChangeRequest[]> {
    return new Observable<ChangeRequest[]>(subscriber => {
      const cr = [];
      for(let key in this.accomodationChangeRequests) {
        cr.push(this.accomodationChangeRequests[key]);
      }

      subscriber.next(cr);
    });
  }

  acceptChangeRequest(cr: ChangeRequest, accomodationId: number, room: string): Observable<UserUpdateResult> {
    return new Observable<UserUpdateResult>(subscriber => {
      if (!cr || !accomodationId || !room) {
        subscriber.next(new UserUpdateResult(false, "Input data not valid."));
        return;
      }

      if (this.userAccomodations[cr.username]) {
        this.userAccomodations[cr.username].accomodationId = accomodationId;
        this.userAccomodations[cr.username].room = room;
        subscriber.next(new UserUpdateResult(true));
      }
      else {
        subscriber.next(new UserUpdateResult(false, "User does not have an accomodation."));
      }

      delete this.accomodationChangeRequests[cr.username];
      this.accomodationsUpdated.emit();
    });
  }

  rejectChangeRequest(cr: ChangeRequest): Observable<UserUpdateResult> {
    return new Observable<UserUpdateResult>(subscriber => {
      delete this.accomodationChangeRequests[cr.username];
      subscriber.next(new UserUpdateResult(true));
      this.accomodationsUpdated.emit();
    });
  }
}
