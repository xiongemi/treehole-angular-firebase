import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { HandleApiFailure } from 'src/app/store/app.actions';
import { PostDetailsService } from '../services/post-details.service';
import { initPostDetailsStateModel } from './post-details-state-model-init.const';
import { PostDetailsStateModel } from './post-details-state-model.interface';
import { GetPostComments, GetPostDetails } from './post-details.actions';

@State<PostDetailsStateModel>({
  name: 'postDetails',
  defaults: {
    ...initPostDetailsStateModel
  }
})
@Injectable()
export class PostDetailsState {
  constructor(private postDetailsSerivce: PostDetailsService) {}

  @Action(GetPostDetails)
  getPostDetails(
    ctx: StateContext<PostDetailsStateModel>,
    action: GetPostDetails
  ) {
    ctx.patchState({ post: null });
    return this.postDetailsSerivce.getPostDetails(action.postId).pipe(
      tap(post => {
        if (!post) {
          throw post;
        }
        ctx.patchState({ post });
      }),
      catchError(error => {
        ctx.dispatch(new HandleApiFailure());
        throw error;
      })
    );
  }

  @Action(GetPostComments)
  getPostComments(
    ctx: StateContext<PostDetailsStateModel>,
    action: GetPostComments
  ) {
    return this.postDetailsSerivce
      .getComments(action.postId, action.sortBy)
      .pipe(
        tap(comments => {
          ctx.patchState({ comments });
        }),
        catchError(error => {
          ctx.dispatch(new HandleApiFailure());
          throw error;
        })
      );
  }
}
