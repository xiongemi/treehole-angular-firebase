import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { PostService } from 'src/app/shared/services/post.service';
import { HandleApiFailure } from '../app.actions';
import { initUserStateModel } from './user-state-model-init.const';
import { UserStateModel } from './user-state-model.interface';
import {
  CancelDislikeAPostComment,
  CancelLikeAPostComment,
  DislikeAPostComment,
  GetUserDislikes,
  GetUserLikes,
  HandleOffline,
  HandleOnline,
  LikeAPostComment
} from './user.actions';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    ...initUserStateModel
  }
})
@Injectable()
export class UserState {
  constructor(private postService: PostService) {}

  @Action(LikeAPostComment)
  likeAPost(ctx: StateContext<UserStateModel>, action: LikeAPostComment) {
    return this.postService
      .addLikeDislike('likes', action.uuid, action.postId, action.commentId)
      .pipe(
        tap(() => {
          let likes = ctx.getState().likes;
          likes = likes.concat([
            {
              uuid: action.uuid,
              parentDocId: action.commentId || action.postId
            }
          ]);
          ctx.patchState({ likes });
        }),
        catchError(error => {
          ctx.dispatch(new HandleApiFailure());
          throw error;
        })
      );
  }

  @Action(CancelLikeAPostComment)
  cancelLikeAPost(
    ctx: StateContext<UserStateModel>,
    action: CancelLikeAPostComment
  ) {
    return this.postService
      .cancelLikeDislike('likes', action.uuid, action.postId, action.commentId)
      .pipe(
        tap(() => {
          let likes = ctx.getState().likes;
          likes = likes.filter(
            like => like.parentDocId !== (action.commentId || action.postId)
          );
          ctx.patchState({ likes });
        }),
        catchError(error => {
          ctx.dispatch(new HandleApiFailure());
          throw error;
        })
      );
  }

  @Action(DislikeAPostComment)
  dislikeAPostComment(
    ctx: StateContext<UserStateModel>,
    action: DislikeAPostComment
  ) {
    return this.postService
      .addLikeDislike('dislikes', action.uuid, action.postId, action.commentId)
      .pipe(
        tap(() => {
          let dislikes = ctx.getState().dislikes;
          dislikes = dislikes.concat([
            {
              uuid: action.uuid,
              parentDocId: action.commentId || action.postId
            }
          ]);
          ctx.patchState({ dislikes });
        }),
        catchError(error => {
          ctx.dispatch(new HandleApiFailure());
          throw error;
        })
      );
  }

  @Action(CancelDislikeAPostComment)
  dislikeAPost(
    ctx: StateContext<UserStateModel>,
    action: CancelDislikeAPostComment
  ) {
    return this.postService
      .cancelLikeDislike(
        'dislikes',
        action.uuid,
        action.postId,
        action.commentId
      )
      .pipe(
        tap(() => {
          let dislikes = ctx.getState().dislikes;
          dislikes = dislikes.filter(
            dislike =>
              dislike.parentDocId !== (action.commentId || action.postId)
          );
          ctx.patchState({ dislikes });
        }),
        catchError(error => {
          ctx.dispatch(new HandleApiFailure());
          throw error;
        })
      );
  }

  @Action(GetUserLikes)
  getuserLikes(ctx: StateContext<UserStateModel>, action: GetUserLikes) {
    ctx.patchState({ likes: [] });
    return this.postService.getUserLikes(action.uuid).pipe(
      tap(likeResponses => {
        ctx.patchState({ likes: likeResponses });
      }),
      catchError(error => {
        ctx.dispatch(new HandleApiFailure());
        throw error;
      })
    );
  }

  @Action(GetUserDislikes)
  getuserDisikes(ctx: StateContext<UserStateModel>, action: GetUserLikes) {
    ctx.patchState({ dislikes: [] });
    return this.postService.getUserDislikes(action.uuid).pipe(
      tap(dislikeResponses => {
        ctx.patchState({ dislikes: dislikeResponses });
      }),
      catchError(error => {
        ctx.dispatch(new HandleApiFailure());
        throw error;
      })
    );
  }

  @Action(HandleOnline)
  handleOnline(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ isOnline: true });
  }

  @Action(HandleOffline)
  handleOffline(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ isOnline: false });
  }
}
