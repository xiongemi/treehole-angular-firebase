import { createSelector } from '@ngxs/store';
import { AppStateModel } from 'src/app/store/app-state-model.interface';

import { Post } from 'src/app/models/post.interface';
import { PostsState } from './posts.state';
import { PostsStateModel } from './posts-state-model.interface';

export const getPostsState = (appState: AppStateModel): PostsStateModel =>
  appState.posts;

export const getPosts = (appState: AppStateModel) =>
  getPostsState(appState).posts;

export const getTotalPostsNumber = createSelector(
  [getPosts],
  (posts: Post[]) => posts.length
);

export const getPostsPageIndex = (appState: AppStateModel) =>
  getPostsState(appState).pageIndex;

export const getPostsPageSize = (appState: AppStateModel) =>
  getPostsState(appState).pageSize;

export const getPostsOncurrentPage = createSelector(
  [getPosts, getPostsPageIndex, getPostsPageSize],
  (posts: Post[], pageIndex: number, pageSize: number): Post[] => {
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = pageIndex * pageSize;
    return posts.slice(startIndex, endIndex);
  }
);
