import { Component } from '@angular/core';
import { AuthenticationEvent } from './events/authentication.event';
import { AuthenticationService } from './services/contracts/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pki-univerzijada';

  constructor(private authService: AuthenticationService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }


}
