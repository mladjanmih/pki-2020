import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Venue } from 'src/app/models/venue.model';
import { VenueService } from 'src/app/services/contracts/venue.service';
import { ScheduleVenueComponent } from './schedule-venue/schedule-venue.component';

@Component({
  selector: 'app-venue-management',
  templateUrl: './venue-management.component.html',
  styleUrls: ['./venue-management.component.css']
})
export class VenueManagementComponent implements OnInit {

  constructor(private venueService: VenueService,
    private modalService: NgbModal) { }
  venues: Venue[];
  ngOnInit(): void {
    this.venueService.getUnscheduledVenues()
    .pipe(first())
    .subscribe((venues: Venue[]) => {
      this.venues = venues;
    })

    this.venueService.venuesUpdated.subscribe(() => {
      this.venueService.getUnscheduledVenues()
      .pipe(first())
      .subscribe((venues: Venue[]) => {
        this.venues = venues;
      })
    })
  }

  open(venue: Venue) {
    const modal = this.modalService.open(ScheduleVenueComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    modal.componentInstance.venue = venue;
  }

}
