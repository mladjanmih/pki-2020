import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Venue } from 'src/app/models/venue.model';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.css']
})
export class VenueDetailsComponent implements OnInit {

  @Input() venue: Venue;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
