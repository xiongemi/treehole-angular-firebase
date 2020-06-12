import { AppStateModel } from 'src/app/store/app-state-model.interface';

export const getPostsState = (appState: AppStateModel) => appState.posts;

export const getPosts = (appState: AppStateModel) =>
  getPostsState(appState).posts;
