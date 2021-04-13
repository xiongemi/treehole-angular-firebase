import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LikeDislikeService } from '../../../../shared/services/like-dislike.service';
import {
  getDoesUserDislike,
  getDoesUserLike
} from '../../../../store/user/user.selectors';
import { Comment } from '../../models/comment.interface';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({ transform: 'translateY(-10%)', opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ transform: 'translateY(-10%)', opacity: 0 }))
      ])
    ])
  ],
  // tslint:disable-next-line: no-host-metadata-property
  host: { class: 'db' }
})
export class PostCommentsComponent {
  @Input() comments: Comment[];
  @Input() postId: string;
  @Input() parentDocId: string;

  @Output() saveComment = new EventEmitter<{
    comment: string;
    parentDocId: string;
  }>();

  constructor(
    private store: Store,
    private likeDislikeService: LikeDislikeService
  ) {}

  showReplyTo(comment: Comment) {
    comment.shouldShowReplyTo = true;
  }

  hideReplyTo(comment: Comment) {
    comment.shouldShowReplyTo = false;
  }

  toggleShowChildComments(comment: Comment) {
    comment.shouldShowChildComments = !comment.shouldShowChildComments;
  }

  doesUserLikesComment$(commentId: string): Observable<boolean> {
    return this.store.select(getDoesUserLike(commentId));
  }

  doesUserDislikesComment$(commentId: string): Observable<boolean> {
    return this.store.select(getDoesUserDislike(commentId));
  }

  like(comment: Comment) {
    this.likeDislikeService.like(
      this.doesUserLikesComment$(comment.id),
      this.doesUserDislikesComment$(comment.id),
      comment
    );
  }

  dislike(comment: Comment) {
    this.likeDislikeService.dislike(
      this.doesUserLikesComment$(comment.id),
      this.doesUserDislikesComment$(comment.id),
      comment
    );
  }

  onSaveComment(comment: string, parentDocId: string) {
    this.saveComment.emit({ comment, parentDocId });
  }
}
