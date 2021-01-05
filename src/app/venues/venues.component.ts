import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Venue } from '../models/venue.model';
import { AuthenticationService } from '../services/contracts/authentication.service';
import { VenueService } from '../services/contracts/venue.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {

  constructor(private venueService: VenueService,
  private authenticationService: AuthenticationService) { }

  private user: User;
  userVenues: Venue[];
  ngOnInit(): void {
    this.user = this.authenticationService.authenticate();
    this.venueService.getUserVenues(this.user.username)
    .subscribe((venues: Venue[]) => {
      this.userVenues = venues;
    })
  }

}
