import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';
import { AuthenticationService } from '../services/contracts/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  collapsed = true;
  ngOnInit(): void {
  }

  isAdmin(): boolean {
    const user = this.authenticationService.authenticate();
    return user && user.role === UserRole.ADMIN ;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  authenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
