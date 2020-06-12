import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Action, State, StateContext } from '@ngxs/store';

import { initUserStateModel } from './user-state-model-init.const';
import { UserStateModel } from './user-state-model.interface';
import { SetLanguage } from './user.actions';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    ...initUserStateModel
  }
})
@Injectable()
export class UserState {
  constructor(private translateService: TranslateService) {}

  @Action(SetLanguage)
  setLanguage(ctx: StateContext<UserStateModel>, action: SetLanguage) {
    this.translateService.use(action.language);
    ctx.patchState({ language: action.language });
  }
}
