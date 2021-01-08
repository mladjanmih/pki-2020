import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { User } from 'src/app/models/user.model';
import { Venue } from 'src/app/models/venue.model';
import { VenueService } from '../../contracts/venue.service';

@Injectable({
  providedIn: 'root'
})
export class VenueMockService extends VenueService {
  private venues: {[key: number]: Venue } = {
    1: new Venue(1, 'Football', 'Group Phase Serbia vs. France', 'Partizan Stadium, Humska 1', new Date(2021, 6, 22, 18, 30)),
    2: new Venue(2, 'Tennis', '1/8 Finals Novak Djokovic vs. Dominik Thiem', 'Partizan Stadium, Humska 1', new Date(2021, 6, 22, 18, 30)),
    3: new Venue(3,'Football', 'Group Phase Serbia vs. Denmark', 'Partizan Stadium, Humska 1', new Date(2021, 6, 22, 18, 30)),
    4: new Venue(4, 'Handball', 'Group Phase Serbia vs. Netherlands', 'Aleksandar Nikolic Hall, Humska 1', new Date(2021, 6, 22, 18, 30)),
    5: new Venue(5, 'Handball', 'Group Phase Serbia vs. Denmark', 'Aleksandar Nikolic Hall, Humska 1', new Date(2021, 6, 22, 18, 30)),
    6: new Venue(6, 'Tennis', '1/4 Finals Novak Djokovic vs. Alexander Zverev','Partizan Stadium, Humska 1', new Date(2021, 6, 22, 18, 30)),
    7: new Venue(7, 'Handball', 'Group Phase Serbia vs. Croatia', null, null),
    8: new Venue(8, 'Football', 'Group Phase Serbia vs. Sweden', null, null),
  }

  private userVenues: {[key: string]: number[]} = {
    'user': [1, 3],
    'novak.djokovic': [2,6],
    'andrea.lekic': [4, 5]
  }

  getVenue(id: number): Observable<Venue> {
    return new Observable<Venue>(subscriber => {
      if (this.venues[id]) {
        subscriber.next(this.venues[id]);
      }
      else {
        subscriber.next(null);
      }
    }).pipe(first());
  }

  getUserNextVenue(username: string): Observable<Venue>  {
    return new Observable<Venue>(subscriber => {
      if (this.userVenues[username]) {
        subscriber.next(this.venues[this.userVenues[username][0]]);
      }
      else {
        subscriber.next(null);
      }
    }).pipe(first());
  }

  getUserVenues(username: string): Observable<Venue[]> {
    return new Observable<Venue[]>(subscriber => {
      const userVenues = [];
      if (this.userVenues[username]) {
        for(let i = 0; i < this.userVenues[username].length; ++i) {
          userVenues.push(this.venues[this.userVenues[username][i]])
        }
      }
      else {
        subscriber.next(null);
      }
      subscriber.next(userVenues);
    }).pipe(first());
  }


  getUnscheduledVenues() : Observable<Venue[]> {
    return new Observable<Venue[]>(subscriber => {
      const venues = [];
      for(let id in this.venues) {
        if (!this.venues[id].scheduled()) {
          venues.push(this.venues[id]);
        }
      }

      subscriber.next(venues);
    })
  }

  putVenue(id: number, venue: Venue): Observable<UserUpdateResult> {
    return new Observable<UserUpdateResult>(subscriber => {
      if (this.venues[id]) {
        this.venues[id] = venue;
        subscriber.next(new UserUpdateResult(true));
      }
      else {
        subscriber.next(new UserUpdateResult(false, 'Venue does not exist.'));
      }
    });
  }
}
