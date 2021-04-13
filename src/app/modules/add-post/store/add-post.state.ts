import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { HandleApiFailure, HandleApiSuccess } from 'src/app/store/app.actions';
import { AddPostService } from '../services/add-post.service';
import { SaveAddedPost } from './add-post.actions';

@State<null>({
  name: 'addPost',
  defaults: null,
})
@Injectable()
export class AddPostState {
  constructor(private addPostService: AddPostService) {}

  @Action(SaveAddedPost)
  saveAddedPost(ctx: StateContext<null>, action: SaveAddedPost) {
    return this.addPostService
      .savePost(action.title, action.message, action.uuid, action.language)
      .pipe(
        tap(() => {
          ctx.dispatch(new HandleApiSuccess());
        }),
        catchError((error) => {
          ctx.dispatch(new HandleApiFailure());
          throw error;
        })
      );
  }
}
