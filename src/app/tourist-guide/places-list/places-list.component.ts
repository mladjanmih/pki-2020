import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Place } from 'src/app/models/place.model';
import { TouristGuideService } from 'src/app/services/contracts/tourist-guide.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlaceDetailsComponent } from '../place-details/place-details.component';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {
  faHeart = faHeart;
  places: Place[];
  private modal: NgbModalRef;
  constructor(private touristGuideService: TouristGuideService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.touristGuideService.getPlaces()
    .pipe(first())
    .subscribe((places: Place[]) => {
      this.places = places;
    })
  }

  open(place: Place) {
    this.modal = this.modalService.open(PlaceDetailsComponent);
    this.modal.componentInstance.place = place;
  }
}
