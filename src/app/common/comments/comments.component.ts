import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccomodationService } from 'src/app/services/contracts/accomodation.service';
import { AuthenticationService } from 'src/app/services/contracts/authentication.service';
import { RestaurantService } from 'src/app/services/contracts/restaurant.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[];
  @Input() resourceId: number;
  @Input() resourceType: string;
  constructor(
    private accomodationService: AccomodationService,
    private restaurantService: RestaurantService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.resourceType === "accomodation") {
      this.accomodationService.getComments(this.resourceId)
        .pipe(first())
        .subscribe((comments: Comment[]) => {
          this.comments = comments;
        });
    }
    else if (this.resourceType === "restaurant") {
      this.restaurantService.getComments(this.resourceId)
      .pipe(first())
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
    }
  }

  postReview(form: NgForm) {
    const user = this.authenticationService.authenticate();
    const comment = new Comment(form.value.anonymous ? "Anonymous" : `${user.firstName} ${user.lastName}`, new Date(), form.value.rating, form.value.comment);
    if (this.resourceType === "accomodation") {
      this.accomodationService.putComment(this.resourceId, comment)
        .pipe(first())
        .subscribe((comments: Comment[]) => {
          this.comments = comments;
        });
    }
    else if (this.resourceType === "restaurant") {
      this.restaurantService.putComment(this.resourceId, comment)
      .pipe(first())
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
    }

    form.reset();
  }
}
