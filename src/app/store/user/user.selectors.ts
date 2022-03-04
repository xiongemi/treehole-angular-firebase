import { createSelector } from '@ngxs/store';
import { LikeResponse } from 'src/app/models/like-response.interface';
import { AppStateModel } from '../app-state-model.interface';

export const getUserState = (appState: AppStateModel) => appState.user;

export const getUserLikes = (appState: AppStateModel) =>
  getUserState(appState).likes || [];

export const getUserDislikes = (appState: AppStateModel) =>
  getUserState(appState).dislikes || [];

export const getDoesUserLike = (docId: string) =>
  createSelector([getUserLikes], (likes: LikeResponse[]): boolean => {
    if (!docId) {
      return false;
    }
    return likes.some((like) => like.parentDocId === docId);
  });

export const getDoesUserDislike = (docId: string) =>
  createSelector([getUserDislikes], (dislikes: LikeResponse[]): boolean => {
    if (!docId) {
      return false;
    }
    return dislikes.some((like) => like.parentDocId === docId);
  });

export const getIsOnline = (appState: AppStateModel): boolean =>
  getUserState(appState).isOnline;
