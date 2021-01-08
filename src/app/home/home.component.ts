import { Component, OnInit } from '@angular/core';
import { Accomodation } from '../models/accomodation.model';
import { Restaurant } from '../models/restaurant.model';
import { AuthenticationService } from '../services/contracts/authentication.service';
import { RestaurantService } from '../services/contracts/restaurant.service';
import { AccomodationService } from '../services/contracts/accomodation.service';
import { VenueService } from '../services/contracts/venue.service';
import { Venue } from '../models/venue.model';
import { TouristGuideService } from '../services/contracts/tourist-guide.service';
import { Place } from '../models/place.model';
import { first } from 'rxjs/operators';
import { UserRole } from '../models/user.model';
import { ChangeRequest } from '../models/change-request.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accomodation: Accomodation;
  restaurant: Restaurant;
  venue: Venue;
  place: Place;

  constructor(
    private authService: AuthenticationService,
    private accomodationService: AccomodationService,
    private restaurantService: RestaurantService,
    private touristGuideService: TouristGuideService,
    private venueService: VenueService) { }

    private isFetchingAccomodation: boolean;
    private isFetchingRestaurant: boolean;
    private isFetchingVenue: boolean;
    private isFetchingPlace: boolean;

    accomodationChangeRequests : ChangeRequest[] = [];
    restaurantChangeRequests : ChangeRequest[] = [];
    unscheduledVenues: Venue[] = [];
  ngOnInit(): void {
    const user = this.authService.authenticate();
    if (user && user.role === UserRole.PLAYER) {
      this.isFetchingAccomodation = true;
      this.accomodationService
      .getUserAccomodation(user.username)
      .subscribe((a: Accomodation)  => {
        this.isFetchingAccomodation = false;
        this.accomodation = a;
      });

      this.isFetchingRestaurant = true;
      this.restaurantService
      .getUserRestaurant(user.username)
      .subscribe((r: Restaurant)   => {
        this.isFetchingRestaurant = false;
        this.restaurant = r;
      });

      this.isFetchingVenue = true;
      this.venueService
      .getUserNextVenue(user.username)
      .subscribe((v: Venue)   => {
        this.isFetchingVenue = false;
        this.venue = v;
      });

      this.isFetchingPlace = true;
      this.touristGuideService
      .getRandomPlace()
      .pipe(first())
      .subscribe((p: Place)   => {
        this.isFetchingPlace = false;
        this.place = p;
      });
    }
    else if (user) {
      this.isFetchingAccomodation = true;
      this.accomodationService.getChangeRequests()
      .pipe(first())
      .subscribe((cr: ChangeRequest[]) => {
        this.isFetchingAccomodation = false;
        this.accomodationChangeRequests = cr;
      })

      this.isFetchingRestaurant = true;
      this.restaurantService.getChangeRequests()
      .pipe(first())
      .subscribe((cr: ChangeRequest[]) => {
        this.isFetchingRestaurant = false;
        this.restaurantChangeRequests = cr;
      });


      this.isFetchingVenue = true;
      this.venueService.getUnscheduledVenues()
      .pipe(first())
      .subscribe((v: Venue[]) => {
        this.isFetchingVenue = false;
        this.unscheduledVenues = v;
      })

      this.isFetchingPlace = false;
    }

  }

  isFetching() : boolean {
    return this.isFetchingRestaurant || this.isFetchingAccomodation || this.isFetchingVenue || this.isFetchingPlace;
  }

  isAdmin(): boolean {
    const user = this.authService.authenticate();
    return user && user.role === UserRole.ADMIN;
  }
}
