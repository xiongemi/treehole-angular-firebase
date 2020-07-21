import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { getUuid } from 'src/app/store/settings/settings.selectors';
import {
  CancelDislikeAPostComment,
  CancelLikeAPostComment,
  DislikeAPostComment,
  LikeAPostComment
} from 'src/app/store/user/user.actions';
import {
  getDoesUserDislike,
  getDoesUserLike
} from 'src/app/store/user/user.selectors';
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
  @Input() shouldShowReplyTo: boolean;

  @Output() cancelComment = new EventEmitter();
  @Output() saveComment = new EventEmitter<{
    comment: string;
    parentDocId: string;
  }>();

  constructor(private store: Store) {}

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
    const uuid = this.store.selectSnapshot(getUuid);
    this.doesUserLikesComment$(comment.id)
      .pipe(first())
      .subscribe((userLikes: boolean) => {
        if (userLikes) {
          this.store.dispatch(
            new CancelLikeAPostComment(uuid, this.postId, comment.id)
          );
          comment.likesCount--;
        } else {
          this.store.dispatch(
            new LikeAPostComment(uuid, this.postId, comment.id)
          );
          comment.likesCount++;

          this.doesUserDislikesComment$(comment.id)
            .pipe(first(), filter(Boolean))
            .subscribe(() => {
              this.store.dispatch(
                new CancelDislikeAPostComment(uuid, this.postId, comment.id)
              );
              comment.dislikesCount--;
            });
        }
      });
  }

  dislike(comment: Comment) {
    const uuid = this.store.selectSnapshot(getUuid);
    this.doesUserDislikesComment$(comment.id)
      .pipe(first())
      .subscribe((userDislikes: boolean) => {
        if (userDislikes) {
          this.store.dispatch(
            new CancelDislikeAPostComment(uuid, this.postId, comment.id)
          );
          comment.dislikesCount--;
        } else {
          this.store.dispatch(
            new DislikeAPostComment(uuid, this.postId, comment.id)
          );
          comment.dislikesCount++;

          this.doesUserLikesComment$(comment.id)
            .pipe(first(), filter(Boolean))
            .subscribe(() => {
              this.store.dispatch(
                new CancelLikeAPostComment(uuid, this.postId, comment.id)
              );
              comment.likesCount--;
            });
        }
      });
  }

  onSaveComment(comment: string, parentDocId: string) {
    this.saveComment.emit({ comment, parentDocId });
  }
}
