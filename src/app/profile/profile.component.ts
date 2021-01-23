import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/contracts/authentication.service';
import { UserService } from '../services/contracts/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild("userInfoForm", { static: false}) userInfoForm: NgForm;
  @ViewChild("changePasswordForm", { static: false}) changePasswordForm: NgForm;

  user: User;
  isUserSubmitted = false;
  isUserSubmitFinished = false;
  userSubmitError: string;

  isPasswordSubmitted = false;
  isPasswordSubmitFinished = false;
  passwordSubmitError: string;

  constructor(private authService: AuthenticationService, private userService: UserService) { }
  ngOnInit(): void {
    this.user = this.authService.authenticate();
    // this.userInfoForm.form.reset({
    //   name: user.firstName,
    //   surname: user.lastName,
    //   birthday: user.birthday,
    //   country: user.country
    // })
  }

  onUserInfoSubmit() {
    if (!this.userInfoForm.valid) {
      this.userSubmitError = "Submitted data is invalid! All fields are required!"
      return;
    }

    if (this.userInfoForm.dirty) {
      this.user.firstName = this.userInfoForm.value.name;
      this.user.lastName = this.userInfoForm.value.surname;
      this.user.birthday = this.userInfoForm.value.birthday;
      this.user.country = this.userInfoForm.value.country;
      this.isUserSubmitted = true;
      this.isUserSubmitFinished = false;
      this.userSubmitError = null;
      this.userService.patchUser(this.user)
      .pipe(first())
      .subscribe(result =>
        {
          this.isUserSubmitFinished = true;
          if (!result.success) {
            this.userSubmitError = result.error;
          }
        }
      );

    }
  }

  onChangePassword() {
    this.isUserSubmitted = true;
    this.isUserSubmitFinished = false;
    this.passwordSubmitError = null;
    this.userService.changePassword(this.user, this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.newPassword)
    .subscribe(result => {
      this.isPasswordSubmitFinished = true;
      if (!result.success) {
        this.passwordSubmitError = result.error;
      }
    })
  }
}
