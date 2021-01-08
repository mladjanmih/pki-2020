import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Accomodation } from 'src/app/models/accomodation.model';
import { ChangeRequest } from 'src/app/models/change-request.model';
import { ResourceType } from 'src/app/models/resource-type.enum';
import { Restaurant } from 'src/app/models/restaurant.model';
import { UserUpdateResult } from 'src/app/models/user-update-result.model';
import { AccomodationService } from 'src/app/services/contracts/accomodation.service';
import { RestaurantService } from 'src/app/services/contracts/restaurant.service';

@Component({
  selector: 'app-change-request',
  templateUrl: './change-request.component.html',
  styleUrls: ['./change-request.component.css']
})
export class ChangeRequestComponent implements OnInit {
  @Input() cr: ChangeRequest;

  isFetchingAccomodations: boolean;
  isFetchingRestaurants: boolean;

  accomodations: Accomodation[];
  restaurants: Restaurant[];
  constructor(public activeModal: NgbActiveModal,
    private accomodationService: AccomodationService,
    private restaurantService: RestaurantService) { }

  accomodationCr() :boolean {
    return this.cr.type === ResourceType.ACCOMODATION;
  }
  ngOnInit(): void {
    this.fetchData();

  }

  isFetching(): boolean {
    return this.isFetchingRestaurants || this.isFetchingAccomodations;
  }

  onChangeRequestSubmit(form: NgForm) {
  console.log(this.cr);
    if (this.cr.type === ResourceType.ACCOMODATION) {
      this.accomodationService.acceptChangeRequest(this.cr, form.value.accomodation, form.value.room).pipe(first()).subscribe((res: UserUpdateResult) => {});
    }
    else {

      this.restaurantService.acceptChangeRequest(this.cr, form.value.restaurant).pipe(first()).subscribe((res: UserUpdateResult) => {});
    }

    this.activeModal.close();
  }

  reject() {
    if (this.cr.type === ResourceType.ACCOMODATION) {
      this.accomodationService.rejectChangeRequest(this.cr).pipe(first()).subscribe((res: UserUpdateResult) => {});
    }
    else {
      this.restaurantService.rejectChangeRequest(this.cr).pipe(first()).subscribe((res: UserUpdateResult) => {});
    }

    this.activeModal.dismiss();
  }

  private fetchData() {
    this.isFetchingAccomodations = true;
    this.accomodationService.getAccomodations()
    .pipe(first())
    .subscribe((accomodations: Accomodation[]) => {
      this.accomodations = accomodations;
      this.isFetchingAccomodations = false;
    });

    this.isFetchingRestaurants = true;
    this.restaurantService.getRestaurants()
    .pipe(first())
    .subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      this.isFetchingRestaurants = false;
    });
  }
}
