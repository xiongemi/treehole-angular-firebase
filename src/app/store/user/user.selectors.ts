import { createSelector } from '@ngxs/store';
import { LikeResponse } from 'src/app/models/like-response.interface';
import { AppStateModel } from '../app-state-model.interface';

export const getUserState = (appState: AppStateModel) => appState.user;

export const getLanguage = (appState: AppStateModel) =>
  getUserState(appState).language;

export const getUuid = (appState: AppStateModel) => getUserState(appState).uuid;

export const getUserLikes = (appState: AppStateModel) =>
  getUserState(appState).likes;

export const getUserDislikes = (appState: AppStateModel) =>
  getUserState(appState).dislikes;

export const getDoesUserLike = (docId: string) =>
  createSelector([getUserLikes], (likes: LikeResponse[]): boolean => {
    if (!docId) {
      return false;
    }
    return !!likes.some(like => like.docId === docId);
  });

export const getDoesUserDislike = (docId: string) =>
  createSelector([getUserDislikes], (dislikes: LikeResponse[]): boolean => {
    if (!docId) {
      return false;
    }
    return !!dislikes.some(like => like.docId === docId);
  });
