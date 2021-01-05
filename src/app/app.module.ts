import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/contracts/authentication.service'
import { AuthenticationMockService } from './services/implementations/mock/authentication-mock.service';
import { UserService } from './services/contracts/user.service';
import { UserMockService } from './services/implementations/mock/user-mock.service';
import { AccomodationMockService } from './services/implementations/mock/accomodation-mock.service';
import { AccomodationService } from './services/contracts/accomodation.service';
import { RestaurantMockService } from './services/implementations/mock/restaurant-mock.service';
import { RestaurantService } from './services/contracts/restaurant.service';
import { VenueMockService } from './services/implementations/mock/venue-mock.service';
import { VenueService } from './services/contracts/venue.service';
import { TouristGuideService } from './services/contracts/tourist-guide.service';
import { TouristGuideMockService } from './services/implementations/mock/tourist-guide-mock.service';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { VenuesComponent } from './venues/venues.component';
import { TouristGuideComponent } from './tourist-guide/tourist-guide.component';
import { UserApiService } from './services/implementations/api/user-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { MustMatchDirective } from './common/must-match.directive';
import { LightboxModule } from 'ngx-lightbox';
import { GalleryComponent } from './common/gallery/gallery.component';
import { MapComponent } from './common/map/map.component';
import { CommentsComponent } from './common/comments/comments.component';
import { AgmCoreModule } from '@agm/core';
import { CommentMockService } from './services/implementations/mock/comment-mock.service';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    AccomodationComponent,
    RestaurantComponent,
    VenuesComponent,
    TouristGuideComponent,
    ProfileComponent,
    MustMatchDirective,
    GalleryComponent,
    MapComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LightboxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDqNR7WcriySVDiRQ_Z5EVkI0OdAbMnYWo'
    }),
    NgbModule,
    NgbRatingModule

  ],
  providers: [
    {provide: AccomodationService, useClass: AccomodationMockService},
    {provide: AuthenticationService, useClass: AuthenticationMockService},
    {provide: RestaurantService, useClass: RestaurantMockService},
    {provide: TouristGuideService, useClass: TouristGuideMockService},
    {provide: UserService, useClass: UserMockService},
    {provide: VenueService, useClass: VenueMockService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
