import { Comment } from "./comment.model";

export class ResourceReviews {
  private _rating: number;
  private _comments: Comment[];
  constructor(comments: Comment[]) {
    if (comments) {
      this._comments = comments;
    }
    else {
      this._comments = [];
    }

    this.calculateRating();
  }

  public get rating() {
    return this._rating;
  }

  public get comments() {
    return this._comments;
  }

  public addComment(comment: Comment) {
    this._comments.unshift(comment);
    this.calculateRating();
  }

  private calculateRating() {
    this._rating = 0;

    for(let i = 0; i < this._comments.length; ++i) {
      this._rating += this._comments[i].rating;
    }

    if (this._comments.length > 0)
      this._rating = (this.rating * 1.0) / this._comments.length;
  }

}
