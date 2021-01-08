import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { Venue } from 'src/app/models/venue.model';
import { VenueService } from 'src/app/services/contracts/venue.service';

@Component({
  selector: 'app-schedule-venue',
  templateUrl: './schedule-venue.component.html',
  styleUrls: ['./schedule-venue.component.css']
})
export class ScheduleVenueComponent implements OnInit {
  @Input() venue: Venue;
  places: string[] = ["Aleksandar Nikolic Hall", "Sports Hall", "Partizan Stadium", "Rajko Mitic Stadium", "Shoping Center Stadium"];
  errorMessage: string;
  constructor(public activeModal: NgbActiveModal,
    private venueService: VenueService) { }

  ngOnInit(): void {
  }

  onVenueSchedule(form: NgForm) {
    this.venue.location = form.value.place;
    this.venue.date= form.value.matchDate;
    this.venueService.putVenue(this.venue.id, this.venue).pipe(first()).subscribe((result: UserUpdateResult) => {
      if (result.success) {
        this.venueService.venuesUpdated.emit();
        this.activeModal.dismiss();
      }
      else {
        this.errorMessage = result.error;
      }
    });

  }

}
