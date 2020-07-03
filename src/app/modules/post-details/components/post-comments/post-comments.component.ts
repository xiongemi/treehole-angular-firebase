import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { getUuid } from 'src/app/store/user/user.selectors';
import { Comment } from '../../models/comment.interface';
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

  like() {}

  dislike() {}
}
