import { v4 as uuidv4 } from 'uuid';
import { SettingsStateModel } from './settings-state-model.interface';

export const initSettingStateModel: SettingsStateModel = {
  language: 'en',
  uuid: uuidv4()
};
