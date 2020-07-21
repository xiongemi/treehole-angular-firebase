import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { clone } from 'ramda';
import { merge, Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMap
} from 'rxjs/operators';
import { Post } from 'src/app/models/post.interface';
import { SortBy } from 'src/app/models/sort-by.enum';
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
import {
  GetPostComments,
  GetPostDetails
} from '../../store/post-details.actions';
import {
  getPostComments,
  getPostDetails
} from '../../store/post-details.selectors';

@Component({
  selector: 'app-post-details-home',
  templateUrl: './post-details-home.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: { class: 'db bg-white' }
})
export class PostDetailsHomeComponent implements OnInit, OnDestroy {
  postId: string;
  post: Post;
  comments: Comment[];

  shouldShowReplyTo = true;
  hasError = false;
  SortBy = SortBy;
  sortBy = new FormControl(SortBy.MostLikes);
  doesUserLikePost$: Observable<boolean>;
  doesUserDislikePost$: Observable<boolean>;

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private postDetailsService: PostDetailsService
  ) {}

  ngOnInit(): void {
    const postId$ = this.route.params.pipe(
      map(params => {
        this.postId = params.id;
        return this.postId;
      }),
      distinctUntilChanged()
    );

    this.subscription.add(
      postId$.subscribe(() => {
        this.getPostDetails();
      })
    );

    this.subscription.add(
      this.store.select(getPostDetails).subscribe(post => {
        this.post = clone(post);
      })
    );

    this.subscription.add(
      this.store.select(getPostComments).subscribe(comments => {
        this.comments = clone(comments);
      })
    );

    this.subscription.add(
      merge(postId$, this.sortBy.valueChanges)
        .pipe(
          switchMap(() => {
            return this.store.dispatch(
              new GetPostComments(this.postId, this.sortBy.value)
            );
          })
        )
        .subscribe()
    );

    this.doesUserLikePost$ = postId$.pipe(
      switchMap(postId => this.store.select(getDoesUserLike(postId)))
    );

    this.doesUserDislikePost$ = postId$.pipe(
      switchMap(postId => this.store.select(getDoesUserDislike(postId)))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showReplyTo() {
    this.shouldShowReplyTo = true;
  }

  hideReplyTo() {
    this.shouldShowReplyTo = false;
  }

  like() {
    const uuid = this.store.selectSnapshot(getUuid);
    this.doesUserLikePost$.pipe(first()).subscribe((userLikes: boolean) => {
      if (userLikes) {
        this.store.dispatch(new CancelLikeAPostComment(uuid, this.postId));
        this.post.likesCount--;
      } else {
        this.store.dispatch(new LikeAPostComment(uuid, this.postId));
        this.post.likesCount++;

        this.doesUserDislikePost$
          .pipe(first(), filter(Boolean))
          .subscribe(() => {
            this.store.dispatch(
              new CancelDislikeAPostComment(uuid, this.postId)
            );
            this.post.dislikesCount--;
          });
      }
    });
  }

  dislike() {
    const uuid = this.store.selectSnapshot(getUuid);
    this.doesUserDislikePost$
      .pipe(first())
      .subscribe((userDislikes: boolean) => {
        if (userDislikes) {
          this.store.dispatch(new CancelDislikeAPostComment(uuid, this.postId));
          this.post.dislikesCount--;
        } else {
          this.store.dispatch(new DislikeAPostComment(uuid, this.postId));
          this.post.dislikesCount++;

          this.doesUserLikePost$
            .pipe(first(), filter(Boolean))
            .subscribe(() => {
              this.store.dispatch(
                new CancelLikeAPostComment(uuid, this.postId)
              );
              this.post.likesCount--;
            });
        }
      });
  }

  saveComment(comment: string, parentDocId: string) {
    this.postDetailsService
      .saveComment(
        comment,
        this.store.selectSnapshot(getUuid),
        parentDocId,
        this.postId
      )
      .subscribe(() => {
        this.store.dispatch(
          new GetPostComments(this.postId, this.sortBy.value)
        );
      });
  }

  getPostDetails() {
    this.store.dispatch(new GetPostDetails(this.postId)).subscribe(
      () => {
        this.hasError = false;
      },
      () => {
        this.hasError = true;
      }
    );
    this.store.dispatch(new GetPostComments(this.postId, this.sortBy.value));
  }
}
