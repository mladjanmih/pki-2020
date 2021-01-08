import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Accomodation } from '../models/accomodation.model';
import { UserUpdateResult } from '../models/user-update-result.model';
import { User } from '../models/user.model';
import { AccomodationService } from '../services/contracts/accomodation.service';
import { AuthenticationService } from '../services/contracts/authentication.service';
@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css']
})
export class AccomodationComponent implements OnInit {

  private user: User;
  private modal: NgbModalRef;
  accomodation: Accomodation;
  errorMessage: string;
  modalError: string;
  changeAccomodationReason: string;
  constructor(
    private accomodationService: AccomodationService,
    private authService: AuthenticationService,
    private modalService: NgbModal){}

  ngOnInit(): void {
    this.user = this.authService.authenticate();
    this.errorMessage = null;
    this.accomodationService
    .getUserAccomodation(this.user.username)
    .pipe(first())
    .subscribe((accomodation: Accomodation) => {
      if (accomodation) {
        this.accomodation = accomodation;
      }
      else {
        this.errorMessage = "Error occured on getting accomodation.";
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
    this.accomodationService.postChangeRequest(this.accomodation.id, this.user, this.changeAccomodationReason)
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
