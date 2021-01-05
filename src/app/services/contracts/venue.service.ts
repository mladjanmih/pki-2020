import { Observable } from 'rxjs';
import { Venue } from 'src/app/models/venue.model';

export class VenueService {
  getVenue(id: number): Observable<Venue> {
    throw "Not implemented";
  }

  getUserNextVenue(username: string): Observable<Venue>  {
    throw "Not implemented.";
  }

  getUserVenues(username: string): Observable<Venue[]> {
    throw "Not implemented.";
  }
}
