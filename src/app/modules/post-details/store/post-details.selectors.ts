import { createSelector } from '@ngxs/store';
import { LikeResponse } from 'src/app/models/like-response.interface';
import { Post } from 'src/app/models/post.interface';
import { AppStateModel } from 'src/app/store/app-state-model.interface';
import {
  getUserDislikes,
  getUserLikes,
} from 'src/app/store/user/user.selectors';
import { Comment } from '../models/comment.interface';
import { PostDetailsStateModel } from './post-details-state-model.interface';

export const getPostDetailsState = (
  appState: AppStateModel
): PostDetailsStateModel => appState.postDetails;

export const getPostDetails = (appState: AppStateModel): Post =>
  getPostDetailsState(appState).post;

export const getPostComments = (appState: AppStateModel): Comment[] =>
  getPostDetailsState(appState).comments;

export const getPostCommentsWithLikesAndDislikes = createSelector(
  [getPostComments, getUserLikes, getUserDislikes],
  (
    comments: Comment[],
    likes: LikeResponse[],
    dislikes: LikeResponse[]
  ): Comment[] => {
    return comments.map((comment) => {
      if (!comment.id) {
        return comment;
      }
      return {
        ...comment,
        doesUserLike: likes.some((like) => like.parentDocId === comment.id),
        doesUserDislike: dislikes.some(
          (like) => like.parentDocId === comment.id
        ),
      };
    });
  }
);
