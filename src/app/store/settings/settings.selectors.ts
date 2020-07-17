
import { AppStateModel } from '../app-state-model.interface';
import { SettingsStateModel } from './settings-state-model.interface';

export const getSettingsState = (appState: AppStateModel): SettingsStateModel =>
  appState.settings;

export const getLanguage = (appState: AppStateModel) =>
  getSettingsState(appState).language;

export const getUuid = (appState: AppStateModel) =>
  getSettingsState(appState).uuid;
