import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { Venue } from 'src/app/models/venue.model';

export class VenueService {
  venuesUpdated: EventEmitter<any> = new EventEmitter();

  getVenue(id: number): Observable<Venue> {
    throw "Not implemented";
  }

  getUserNextVenue(username: string): Observable<Venue>  {
    throw "Not implemented.";
  }

  getUserVenues(username: string): Observable<Venue[]> {
    throw "Not implemented.";
  }

  getUnscheduledVenues() : Observable<Venue[]> {
    throw "Not implemented.";
  }

  putVenue(id: number, venue: Venue): Observable<UserUpdateResult> {
    throw "Not implemented.";
  }
}
