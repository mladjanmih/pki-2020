import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/contracts/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("f", { static : false }) signupForm: NgForm;
  public loginError = false;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  onSubmit(): void {
    if (!this.signupForm.valid) {
      return;
    }
    const result = this.authService.login(this.signupForm.value.username, this.signupForm.value.password);
    result.pipe(first()).subscribe((user: User) => {
      if (user) {
        this.loginError = false;
        this.router.navigate(['']);
      }
      else {
        this.loginError = true;
      }
    }, error => {
      console.warn(error);
      this.loginError = true;
    });
  }
}
