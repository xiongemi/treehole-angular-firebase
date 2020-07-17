import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Action, State, StateContext } from '@ngxs/store';

import { catchError, tap, timeout } from 'rxjs/operators';
import { reuqestTimeout } from 'src/app/models/timeout.const';
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
  constructor(
    private translateService: TranslateService,
    private postService: PostService
  ) {}

  @Action(LikeAPostComment)
  likeAPost(ctx: StateContext<UserStateModel>, action: LikeAPostComment) {
    return this.postService.addLikeDislike(
      'likes',
      action.uuid,
      action.postId,
      action.commentId
    );
  }

  @Action(CancelLikeAPostComment)
  undislikeAPost(
    ctx: StateContext<UserStateModel>,
    action: CancelLikeAPostComment
  ) {
    return this.postService
      .cancelLikeDislike('likes', action.uuid, action.postId, action.commentId)
      .pipe(
        timeout(reuqestTimeout),
        catchError(error => {
          ctx.dispatch(new HandleApiFailure());
          throw error;
        })
      );
  }

  @Action(DislikeAPostComment)
  unlikeAPost(ctx: StateContext<UserStateModel>, action: DislikeAPostComment) {
    return this.postService
      .addLikeDislike('dislikes', action.uuid, action.postId, action.commentId)
      .pipe(
        timeout(reuqestTimeout),
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
        timeout(reuqestTimeout),
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
      })
    );
  }

  @Action(GetUserDislikes)
  getuserDisikes(ctx: StateContext<UserStateModel>, action: GetUserLikes) {
    ctx.patchState({ dislikes: [] });
    return this.postService.getUserDislikes(action.uuid).pipe(
      tap(dislikeResponses => {
        ctx.patchState({ dislikes: dislikeResponses });
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
