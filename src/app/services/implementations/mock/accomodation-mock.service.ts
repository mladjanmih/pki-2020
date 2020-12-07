import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
import { Accomodation } from 'src/app/models/accomodation.model';
import { UserAccomodation } from 'src/app/models/user-accomodation.model';
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

  getAccomodation(id: number): Observable<Accomodation> {
    return new Observable<Accomodation>(subscriber => {
      if (this.accomodations[id]) {
        subscriber.next(this.accomodations[id]);
      }
      else {
        subscriber.next(null);
      }
    }).pipe(first());
  }

  getUserAccomodation(username: string): Observable<Accomodation> {
    return new Observable<Accomodation>(subscriber => {
      if (this.userAccomodations[username]) {
        var clAcc = Object.assign({}, this.accomodations[this.userAccomodations[username].accomodationId]);
        clAcc.room = this.userAccomodations[username].room;
        subscriber.next(clAcc);
      }
      else {
        subscriber.next(null);
      }
    }).pipe(first());
  }
}
