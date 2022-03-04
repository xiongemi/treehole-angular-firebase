import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { clone } from 'ramda';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../../../models/post.interface';
import { SortBy } from '../../../../models/sort-by.enum';
import { LikeDislikeService } from '../../../../shared/services/like-dislike.service';
import { SetLanguage } from '../../../../store/settings/settings.actions';
import { getLanguage } from '../../../../store/settings/settings.selectors';
import {
  getDoesUserDislike,
  getDoesUserLike,
} from '../../../../store/user/user.selectors';
import {
  ChangePostsPageIndex,
  ChangePostsPageSize,
  GetPosts,
} from '../../store/posts.actions';
import {
  getPostsOnCurrentPageWithLikesAndDislikes,
  getPostsPageSize,
  getTotalPostsNumber,
} from '../../store/posts.selectors';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.css'],
})
export class PostsHomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  searchForm = new FormGroup({
    sortBy: new FormControl(SortBy.NewestPosts),
  });
  SortBy = SortBy;

  totalPostNumber$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;

  loading = true;
  hasError = false;

  private subscription = new Subscription();

  constructor(
    private store: Store,
    private actions: Actions,
    private likeDislikeService: LikeDislikeService
  ) {}

  ngOnInit() {
    this.getPosts();

    this.subscription.add(
      this.actions.pipe(ofActionDispatched(SetLanguage)).subscribe(() => {
        this.getPosts();
      })
    );

    this.subscription.add(
      this.searchForm.get('sortBy').valueChanges.subscribe(() => {
        this.getPosts();
      })
    );

    this.subscription.add(
      this.store
        .select(getPostsOnCurrentPageWithLikesAndDislikes)
        .subscribe((posts) => {
          this.posts = clone(posts);
        })
    );

    this.totalPostNumber$ = this.store.select(getTotalPostsNumber);
    this.pageSize$ = this.store.select(getPostsPageSize);
    this.pageIndex$ = this.store.select(getPostsPageSize);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPosts() {
    this.store
      .dispatch(
        new GetPosts(
          this.store.selectSnapshot(getLanguage),
          this.searchForm.value.sortBy
        )
      )
      .subscribe(
        () => {
          this.loading = false;
          this.hasError = false;
        },
        () => {
          this.loading = false;
          this.hasError = true;
        }
      );
  }

  onPageIndexChange(pageIndex: number) {
    this.store.dispatch(new ChangePostsPageIndex(pageIndex));
  }

  onPageSizeChange(pageSize: number) {
    this.store.dispatch(new ChangePostsPageSize(pageSize));
  }

  doesUserLikesComment$(postId: string): Observable<boolean> {
    return this.store.select(getDoesUserLike(postId));
  }

  doesUserDislikesComment$(postId: string): Observable<boolean> {
    return this.store.select(getDoesUserDislike(postId));
  }

  like(post: Post) {
    this.likeDislikeService.like(
      this.doesUserLikesComment$(post.id),
      this.doesUserDislikesComment$(post.id),
      post
    );
  }

  dislike(post: Post) {
    this.likeDislikeService.dislike(
      this.doesUserLikesComment$(post.id),
      this.doesUserDislikesComment$(post.id),
      post
    );
  }

  trackById(post: Post) {
    return post.id;
  }
}
