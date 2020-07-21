import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { SetLanguage } from 'src/app/store/settings/settings.actions';
import { getLanguage } from 'src/app/store/settings/settings.selectors';
import { SortBy } from '../../../../models/sort-by.enum';
import {
  ChangePostsPageIndex,
  ChangePostsPageSize,
  GetPosts
} from '../../store/posts.actions';
import {
  getPostsOncurrentPage,
  getPostsPageSize,
  getTotalPostsNumber
} from '../../store/posts.selectors';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.css']
})
export class PostsHomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  searchForm = new FormGroup({
    sortBy: new FormControl(SortBy.NewestPosts)
  });
  SortBy = SortBy;

  totalPostNumber$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;

  loading = true;
  hasError = false;

  private subscription = new Subscription();

  constructor(private store: Store, private actions: Actions) {}

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
      this.store.select(getPostsOncurrentPage).subscribe(posts => {
        this.posts = posts;
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
}
