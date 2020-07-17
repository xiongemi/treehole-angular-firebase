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
import { PostDetailsService } from '../../service/post-details.service';

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

  constructor(
    private store: Store,
    private postDetailsService: PostDetailsService
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

  like(commentId: string) {
    const uuid = this.store.selectSnapshot(getUuid);
    this.doesUserLikesComment$(commentId)
      .pipe(first())
      .subscribe((userLikes: boolean) => {
        if (userLikes) {
          this.store.dispatch(
            new CancelLikeAPostComment(uuid, this.postId, commentId)
          );
        } else {
          this.store.dispatch(
            new LikeAPostComment(uuid, this.postId, commentId)
          );

          this.doesUserDislikesComment$(commentId)
            .pipe(first(), filter(Boolean))
            .subscribe(() => {
              this.store.dispatch(
                new CancelDislikeAPostComment(uuid, this.postId, commentId)
              );
            });
        }
      });
  }

  dislike(commentId: string) {
    const uuid = this.store.selectSnapshot(getUuid);
    this.doesUserDislikesComment$(commentId)
      .pipe(first())
      .subscribe((userDislikes: boolean) => {
        if (userDislikes) {
          this.store.dispatch(
            new CancelDislikeAPostComment(uuid, this.postId, commentId)
          );
        } else {
          this.store.dispatch(
            new DislikeAPostComment(uuid, this.postId, commentId)
          );

          this.doesUserLikesComment$(commentId)
            .pipe(first(), filter(Boolean))
            .subscribe(() => {
              this.store.dispatch(
                new CancelLikeAPostComment(uuid, this.postId, commentId)
              );
            });
        }
      });
  }

  saveComment(comment: string, parentCommentId: string) {
    this.postDetailsService
      .saveComment(
        comment,
        this.store.selectSnapshot(getUuid),
        parentCommentId,
        this.postId
      )
      .subscribe();
  }
}
