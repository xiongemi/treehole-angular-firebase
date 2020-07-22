import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Post } from '../../models/post.interface';
import { Comment } from '../../modules/post-details/models/comment.interface';
import { getUuid } from '../../store/settings/settings.selectors';
import {
  CancelDislikeAPostComment,
  CancelLikeAPostComment,
  DislikeAPostComment,
  LikeAPostComment
} from '../../store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {
  constructor(private store: Store) {}

  like(
    doesUserLike$: Observable<boolean>,
    doesUserDislike$: Observable<boolean>,
    doc: Post | Comment
  ) {
    const uuid = this.store.selectSnapshot(getUuid);
    doesUserLike$.pipe(first()).subscribe((userLikes: boolean) => {
      if (userLikes) {
        this.store.dispatch(new CancelLikeAPostComment(uuid, doc.id));
        doc.likesCount--;
      } else {
        this.store.dispatch(new LikeAPostComment(uuid, doc.id));
        doc.likesCount++;

        doesUserDislike$.pipe(first(), filter(Boolean)).subscribe(() => {
          this.store.dispatch(new CancelDislikeAPostComment(uuid, doc.id));
          doc.dislikesCount--;
        });
      }
    });
  }

  dislike(
    doesUserLike$: Observable<boolean>,
    doesUserDislike$: Observable<boolean>,
    doc: Post | Comment
  ) {
    const uuid = this.store.selectSnapshot(getUuid);
    doesUserDislike$.pipe(first()).subscribe((userDislikes: boolean) => {
      if (userDislikes) {
        this.store.dispatch(new CancelDislikeAPostComment(uuid, doc.id));
        doc.dislikesCount--;
      } else {
        this.store.dispatch(new DislikeAPostComment(uuid, doc.id));
        doc.dislikesCount++;

        doesUserLike$.pipe(first(), filter(Boolean)).subscribe(() => {
          this.store.dispatch(new CancelLikeAPostComment(uuid, doc.id));
          doc.likesCount--;
        });
      }
    });
  }
}
