import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Venue } from 'src/app/models/venue.model';
import { VenueService } from '../../contracts/venue.service';

@Injectable({
  providedIn: 'root'
})
export class VenueMockService extends VenueService {
  private venues: {[key: number]: Venue } = {
    1: {
      name: 'Football, Group Phase vs. France',
      location: 'Partizan Stadium, Humska 1',
      date: new Date(2021, 6, 22, 18, 30)
    },
    2: {
      name: 'Tennis, 1/8 Finals vs. Dominik Thiem',
      location: 'Partizan Stadium, Humska 1',
      date: new Date(2021, 6, 22, 18, 30)
    },
    3: {
      name: 'Football, Group Phase vs. France',
      location: 'Partizan Stadium, Humska 1',
      date: new Date(2021, 6, 22, 18, 30)
    },
    4: {
      name: 'Handball, Group Phase vs. Netherlands',
      location: 'Aleksandar Nikolic Hall, Humska 1',
      date: new Date(2021, 6, 22, 18, 30)
    },
    5: {
      name: 'Handball, Group Phase vs. Denmark',
      location: 'Aleksandar Nikolic Hall, Humska 1',
      date: new Date(2021, 6, 22, 18, 30)
    },
    6: {
      name: 'Tennis, 1/4 Finals vs. Alexander Zverev',
      location: 'Partizan Stadium, Humska 1',
      date: new Date(2021, 6, 22, 18, 30)
    }
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
}
