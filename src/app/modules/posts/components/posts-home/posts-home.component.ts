import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { getLanguage } from 'src/app/store/user/user.selectors';

import { GetPosts } from '../../store/posts.actions';
import { getPosts } from '../../store/posts.selectors';
import { FormGroup, FormControl } from '@angular/forms';
import { SortBy } from '../../models/sort-by.enum';

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

  private subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      new GetPosts(
        this.store.selectSnapshot(getLanguage),
        this.searchForm.value.sortBy
      )
    );
    this.subscription.add(
      this.store.select(getPosts).subscribe(posts => {
        this.posts = posts;
      })
    );

    this.subscription.add(
      this.searchForm.get('sortBy').valueChanges.subscribe((sortBy: SortBy) => {
        this.store.dispatch(
          new GetPosts(this.store.selectSnapshot(getLanguage), sortBy)
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
