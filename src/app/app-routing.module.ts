import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccomodationRestaurantManagementComponent } from './accomodation-restaurant-management/accomodation-restaurant-management.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AdminPermissionGuardService } from './services/admin-permission-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserPermissionGuardService } from './services/user-permission-guard.service';
import { TouristGuideComponent } from './tourist-guide/tourist-guide.component';
import { VenueManagementComponent } from './venues/venue-management/venue-management.component';
import { VenuesComponent } from './venues/venues.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'accomodation', component: AccomodationComponent, canActivate: [AuthGuardService, UserPermissionGuardService] },
  { path: 'restaurant', component: RestaurantComponent, canActivate: [AuthGuardService, UserPermissionGuardService] },
  { path: 'venues', component: VenuesComponent, canActivate: [AuthGuardService, UserPermissionGuardService] },
  { path: 'venues/management', component: VenueManagementComponent, canActivate: [AuthGuardService, AdminPermissionGuardService] },
  { path: 'guide', component: TouristGuideComponent, canActivate: [AuthGuardService, UserPermissionGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'management', component: AccomodationRestaurantManagementComponent, canActivate: [AuthGuardService, AdminPermissionGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
