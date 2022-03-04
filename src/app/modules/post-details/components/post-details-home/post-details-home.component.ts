import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { clone } from 'ramda';
import { merge, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Post } from '../../../../models/post.interface';
import { SortBy } from '../../../../models/sort-by.enum';
import { LikeDislikeService } from '../../../../shared/services/like-dislike.service';
import { getUuid } from '../../../../store/settings/settings.selectors';
import {
  getDoesUserDislike,
  getDoesUserLike,
} from '../../../../store/user/user.selectors';
import { Comment } from '../../models/comment.interface';
import { PostDetailsService } from '../../services/post-details.service';
import {
  GetPostComments,
  GetPostDetails,
} from '../../store/post-details.actions';
import {
  getPostComments,
  getPostDetails,
} from '../../store/post-details.selectors';

@Component({
  selector: 'app-post-details-home',
  templateUrl: './post-details-home.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: { class: 'db bg-white' },
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
    private postDetailsService: PostDetailsService,
    private likeDislikeService: LikeDislikeService
  ) {}

  ngOnInit(): void {
    const postId$ = this.route.params.pipe(
      map((params) => {
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
      this.store.select(getPostDetails).subscribe((post) => {
        this.post = clone(post);
      })
    );

    this.subscription.add(
      this.store.select(getPostComments).subscribe((comments) => {
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
      switchMap((postId) => this.store.select(getDoesUserLike(postId)))
    );

    this.doesUserDislikePost$ = postId$.pipe(
      switchMap((postId) => this.store.select(getDoesUserDislike(postId)))
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
    this.likeDislikeService.like(
      this.doesUserLikePost$,
      this.doesUserDislikePost$,
      this.post
    );
  }

  dislike() {
    this.likeDislikeService.dislike(
      this.doesUserLikePost$,
      this.doesUserDislikePost$,
      this.post
    );
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
