import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant.model';
import { UserUpdateResult } from '../models/user-update-result.model';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/contracts/authentication.service';
import { RestaurantService } from '../services/contracts/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  private user: User;
  private modal: NgbModalRef;

  restaurant: Restaurant;
  errorMessage: string;
  modalError: string;
  changeAccomodationReason: string;


  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthenticationService,
    private modalService: NgbModal){}

  ngOnInit(): void {
    this.user = this.authService.authenticate();
    this.errorMessage = null;
    this.restaurantService
    .getUserRestaurant(this.user.username)
    .pipe(first())
    .subscribe((restaurant: Restaurant) => {
      if (restaurant) {
        this.restaurant = restaurant;
      }
      else {
        this.errorMessage = "Error occured on getting restaurant.";
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }

  open(content) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
    this.modal.result.then((result) => {
      this.modal = result;

    }, (reason) => {
    });
  }

  saveAndClose() {
    this.restaurantService.postChangeRequest(this.restaurant.id, this.user, this.changeAccomodationReason)
    .pipe(first())
    .subscribe((result: UserUpdateResult) => {
      if (result.success) {
        this.modal.close();
      }
      else {
        this.modalError = result.error;
      }
    })
    this.modal.close();
  }

  dismiss() {
    this.modal.dismiss();
  }
}
