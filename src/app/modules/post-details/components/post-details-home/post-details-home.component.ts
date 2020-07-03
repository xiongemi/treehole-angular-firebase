import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { combineLatest, Subscription, merge } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.interface';
import { SortBy } from 'src/app/models/sort-by.enum';
import { DislikeAPost, LikeAPost } from 'src/app/store/user/user.actions';
import { Comment } from '../../models/comment.interface';
import { PostDetailsService } from '../../service/post-details.service';

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
  SortBy = SortBy;
  sortBy = new FormControl(SortBy.MostLikes);

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
      })
    );

    this.subscription.add(
      postId$
        .pipe(
          switchMap((postId: string) => {
            return this.postDetailsService.getPostDetails(postId);
          })
        )
        .subscribe(post => (this.post = post))
    );

    this.subscription.add(
      merge(postId$, this.sortBy.valueChanges)
        .pipe(
          switchMap(() => {
            return this.postDetailsService.getComments(
              this.postId,
              this.sortBy.value
            );
          })
        )
        .subscribe(comments => (this.comments = comments))
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
    this.store.dispatch(new LikeAPost(this.postId));
  }

  dislike() {
    this.store.dispatch(new DislikeAPost(this.postId));
  }
}
