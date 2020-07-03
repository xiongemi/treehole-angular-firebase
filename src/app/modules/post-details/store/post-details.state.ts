import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap, timeout } from 'rxjs/operators';
import { reuqestTimeout } from 'src/app/models/timeout.const';
import { HandleApiFailure, HandleApiSuccess } from 'src/app/store/app.actions';
import { PostDetailsService } from '../service/post-details.service';
import { initPostDetailsStateModel } from './post-details-state-model-init.const';
import { PostDetailsStateModel } from './post-details-state-model.interface';
import { SaveComment } from './post-details.actions';

@State<void>({
  name: 'postDetails',
  defaults: null
})
@Injectable()
export class PostDetailsState {
  constructor(private postDetailsService: PostDetailsService) {}

  @Action(SaveComment)
  saveComment(ctx: StateContext<void>, action: SaveComment) {
    return this.postDetailsService
      .saveComment(
        action.message,
        action.uuid,
        action.parentDocId,
        action.postId
      )
      .pipe(
        timeout(reuqestTimeout),
        tap(() => {
          ctx.dispatch(new HandleApiSuccess());
        }),
        catchError(error => {
          ctx.dispatch(new HandleApiFailure());
          throw error;
        })
      );
  }
}
