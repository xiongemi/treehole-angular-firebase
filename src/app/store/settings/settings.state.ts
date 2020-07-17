import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Action, State, StateContext } from '@ngxs/store';
import { initSettingStateModel } from './settings-state-model-init.const';
import { SettingsStateModel } from './settings-state-model.interface';
import { SetLanguage } from './settings.actions';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    ...initSettingStateModel
  }
})
@Injectable()
export class SettingsState {
  constructor(private translateService: TranslateService) {}

  @Action(SetLanguage)
  setLanguage(ctx: StateContext<SettingsStateModel>, action: SetLanguage) {
    this.translateService.use(action.language);
    ctx.patchState({ language: action.language });
  }
}
