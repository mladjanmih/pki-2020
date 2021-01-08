import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ChangeRequest } from '../models/change-request.model';
import { AccomodationService } from '../services/contracts/accomodation.service';
import { RestaurantService } from '../services/contracts/restaurant.service';
import { ChangeRequestComponent } from './change-request/change-request.component';

@Component({
  selector: 'app-accomodation-restaurant-management',
  templateUrl: './accomodation-restaurant-management.component.html',
  styleUrls: ['./accomodation-restaurant-management.component.css']
})
export class AccomodationRestaurantManagementComponent implements OnInit {
  private isFetchingAccomodation: boolean;
  private isFetchingRestaurant: boolean;

  accomodationChangeRequests: ChangeRequest[] = [];
  restaurantChangeRequests: ChangeRequest[]= [];
  constructor(private accomodationService: AccomodationService,
    private restaurantService: RestaurantService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchData();
    this.restaurantService.restaurantsUpdated.subscribe(() => this.fetchData());
    this.accomodationService.accomodationsUpdated.subscribe(() => this.fetchData());


  }

  isFetching(): boolean {
    return this.isFetchingAccomodation || this.isFetchingRestaurant;
  }

  open(cr: ChangeRequest) {
    const modal = this.modalService.open(ChangeRequestComponent, {ariaLabelledBy: 'modal-basic-title', centered: true});
    modal.componentInstance.cr = cr;
  }

  private fetchData() {
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
  }
}
