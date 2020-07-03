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
  UndislikeAPost
} from './user.actions';
import { PostService } from 'src/app/shared/services/post.service';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';

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
    return this.postService.uncheckLike(action.postId, uuid);
  }

  @Action(UndislikeAPost)
  undislikeAPost(ctx: StateContext<UserStateModel>, action: DislikeAPost) {
    const uuid = ctx.getState().uuid;
    return this.postService.uncheckDisike(action.postId, uuid);
  }

  @Action(UnlikeAPost)
  unlikeAPost(ctx: StateContext<UserStateModel>, action: LikeAPost) {
    const uuid = ctx.getState().uuid;
    return this.postService.like(action.postId, uuid);
  }

  @Action(DislikeAPost)
  dislikeAPost(ctx: StateContext<UserStateModel>, action: DislikeAPost) {
    const uuid = ctx.getState().uuid;
    return this.postService.dislike(action.postId, uuid);
  }
}
