import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { getUuid } from 'src/app/store/user/user.selectors';
import { Comment } from '../../models/comment.interface';
import { PostDetailsService } from '../../service/post-details.service';
import { HandleApiSuccess, HandleApiFailure } from 'src/app/store/app.actions';
import { catchError } from 'rxjs/operators';
import { SaveComment } from '../../store/post-details.actions';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html'
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

  saveComment(comment: string) {
    const commentRequest: Comment = {
      comment,
      uuid: this.store.selectSnapshot(getUuid),
      parentDocId: this.parentDocId,
      createdAt: new Date(),
      likesCount: 0,
      dislikesCount: 0
    };
    this.store.dispatch(new SaveComment(commentRequest, this.postId));
  }

  like() {}

  dislike() {}
}
