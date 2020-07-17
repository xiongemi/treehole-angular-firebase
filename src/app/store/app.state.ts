import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Action, State, StateContext } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { first } from 'rxjs/operators';

import { HandleApiFailure, HandleApiSuccess } from './app.actions';

@State<null>({
  name: 'app',
  defaults: null
})
@Injectable()
export class AppState {
  constructor(
    private message: NzMessageService,
    private translateService: TranslateService
  ) {}

  @Action(HandleApiFailure)
  handleApiFailure(_, action: HandleApiFailure) {
    this.translateService
      .get(action.customMessage || 'MESSAGES.FAILED')
      .pipe(first())
      .subscribe(message => {
        this.message.error(message);
      });
  }

  @Action(HandleApiSuccess)
  handleApiSuccess(_, action: HandleApiSuccess) {
    this.translateService
      .get(action.customMessage || 'MESSAGES.SUCCESS')
      .pipe(first())
      .subscribe(message => {
        this.message.success(message);
      });
  }
}
