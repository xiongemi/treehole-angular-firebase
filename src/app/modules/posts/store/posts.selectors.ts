import { createSelector } from '@ngxs/store';

import { AppStateModel } from 'src/app/store/app-state-model.interface';
import { Post } from 'src/app/models/post.interface';
import { PostsStateModel } from './posts-state-model.interface';
import {
  getUserDislikes,
  getUserLikes,
} from 'src/app/store/user/user.selectors';
import { LikeResponse } from 'src/app/models/like-response.interface';

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

export const getPostsOnCurrentPage = createSelector(
  [getPosts, getPostsPageIndex, getPostsPageSize],
  (posts: Post[], pageIndex: number, pageSize: number): Post[] => {
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = pageIndex * pageSize;
    return posts.slice(startIndex, endIndex);
  }
);

export const getPostsOnCurrentPageWithLikesAndDislikes = createSelector(
  [getPostsOnCurrentPage, getUserLikes, getUserDislikes],
  (posts: Post[], likes: LikeResponse[], dislikes: LikeResponse[]): Post[] => {
    return posts.map((post) => {
      if (!post.id) {
        return post;
      }
      return {
        ...post,
        doesUserLike: likes.some((like) => like.parentDocId === post.id),
        doesUserDislike: dislikes.some((like) => like.parentDocId === post.id),
      };
    });
  }
);
