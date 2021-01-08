import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
  @Input() place: Place;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  constructor( public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
