import { Observable } from 'rxjs';
import { Accomodation } from 'src/app/models/accomodation.model';

export class AccomodationService {
  getAccomodation(id: number): Observable<Accomodation> {
    throw "Not implemented.";
  }

  getUserAccomodation(username: string): Observable<Accomodation>  {
    throw "Not implemented.";
  }
}
