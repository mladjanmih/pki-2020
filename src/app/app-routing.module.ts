import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TouristGuideComponent } from './tourist-guide/tourist-guide.component';
import { VenuesComponent } from './venues/venues.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'accomodation', component: AccomodationComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'venues', component: VenuesComponent },
  { path: 'guide', component: TouristGuideComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
