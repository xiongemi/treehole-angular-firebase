import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError } from 'rxjs/operators';
import { AddPostService } from '../services/add-post.service';
import { SaveAddedPost } from './add-post.actions';
import { HandleApiFailure } from 'src/app/store/app.actions';

@State<null>({
  name: 'addPost',
  defaults: null
})
@Injectable()
export class PostsState {
  constructor(private addPostService: AddPostService) {}

  @Action(SaveAddedPost)
  saveAddedPost(ctx: StateContext<null>, action: SaveAddedPost) {
    this.addPostService
      .savePost(action.title, action.message, action.uuid, action.language)
      .pipe(
        catchError(error => {
          return ctx.dispatch(new HandleApiFailure(error));
        })
      );
  }
}
