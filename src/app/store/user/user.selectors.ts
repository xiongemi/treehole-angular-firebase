import { AppStateModel } from '../app-state-model.interface';

export const getUserState = (appState: AppStateModel) => appState.user;

export const getLanguage = (appState: AppStateModel) =>
  getUserState(appState).language;

export const getUuid = (appState: AppStateModel) => getUserState(appState).uuid;
