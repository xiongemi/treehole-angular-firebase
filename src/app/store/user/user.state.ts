import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Action, State, StateContext } from '@ngxs/store';

import { initUserStateModel } from './user-state-model-init.const';
import { UserStateModel } from './user-state-model.interface';
import {
  SetLanguage,
  LikeAPost,
  DislikeAPost,
  UnlikeAPost,
  UndislikeAPost,
  GetUserLikes,
  GetUserDislikes
} from './user.actions';
import { PostService } from 'src/app/shared/services/post.service';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { tap } from 'rxjs/operators';

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

  @Action(SetLanguage)
  setLanguage(ctx: StateContext<UserStateModel>, action: SetLanguage) {
    this.translateService.use(action.language);
    ctx.patchState({ language: action.language });
  }

  @Action(LikeAPost)
  likeAPost(ctx: StateContext<UserStateModel>, action: LikeAPost) {
    const uuid = ctx.getState().uuid;
    return this.postService.uncheckLike(action.docId, uuid);
  }

  @Action(UndislikeAPost)
  undislikeAPost(ctx: StateContext<UserStateModel>, action: DislikeAPost) {
    const uuid = ctx.getState().uuid;
    return this.postService.uncheckDisike(action.docId, uuid);
  }

  @Action(UnlikeAPost)
  unlikeAPost(ctx: StateContext<UserStateModel>, action: LikeAPost) {
    const uuid = ctx.getState().uuid;
    return this.postService.like(action.docId, uuid);
  }

  @Action(DislikeAPost)
  dislikeAPost(ctx: StateContext<UserStateModel>, action: DislikeAPost) {
    const uuid = ctx.getState().uuid;
    return this.postService.dislike(action.docId, uuid);
  }

  @Action(GetUserLikes)
  getuserLikes(ctx: StateContext<UserStateModel>) {
    const uuid = ctx.getState().uuid;
    return this.postService
      .getUserLikes(uuid)
      .pipe(tap(likeResponses => ctx.patchState({ likes: likeResponses })));
  }

  @Action(GetUserDislikes)
  getuserDisikes(ctx: StateContext<UserStateModel>) {
    const uuid = ctx.getState().uuid;
    return this.postService
      .getUserDislikes(uuid)
      .pipe(
        tap(dislikeResponses => ctx.patchState({ dislikes: dislikeResponses }))
      );
  }
}
