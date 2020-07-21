import { Post } from 'src/app/models/post.interface';
import { AppStateModel } from 'src/app/store/app-state-model.interface';
import { Comment } from '../models/comment.interface';
import { PostDetailsStateModel } from './post-details-state-model.interface';

export const getPostDetailsState = (
  appState: AppStateModel
): PostDetailsStateModel => appState.postDetails;

export const getPostDetails = (appState: AppStateModel): Post =>
  getPostDetailsState(appState).post;

export const getPostComments = (appState: AppStateModel): Comment[] =>
  getPostDetailsState(appState).comments;
