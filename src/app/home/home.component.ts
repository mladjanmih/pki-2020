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

  ngOnInit(): void {
    console.log("HomeComponent: ngOninit");
    const user = this.authService.authenticate();

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
    .subscribe((p: Place)   => {
      this.isFetchingPlace = false;
      this.place = p;
    });

  }

  isFetching() : boolean {
    return this.isFetchingRestaurant || this.isFetchingAccomodation || this.isFetchingVenue || this.isFetchingPlace;
  }

}
