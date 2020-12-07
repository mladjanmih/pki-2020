import { Observable } from 'rxjs';
import { Place } from 'src/app/models/place.model';

export class TouristGuideService {
  getRandomPlace() : Observable<Place> {
    throw "Not implemented.";
  }

  getPlaces() : Observable<Place[]> {
    throw "Not implemented.";
  }

  getPlaceById(id: number): Observable<Place> {
    throw "Not implemented.";
  }
}
