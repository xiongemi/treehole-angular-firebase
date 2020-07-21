import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap, timeout } from 'rxjs/operators';

import { HandleApiFailure } from 'src/app/store/app.actions';
import { PostsService } from '../services/posts.service';
import { initPostsStateModel } from './post-state-model-init.const';
import { PostsStateModel } from './posts-state-model.interface';
import {
  ChangePostsPageIndex,
  ChangePostsPageSize,
  GetPosts
} from './posts.actions';

@State<PostsStateModel>({
  name: 'posts',
  defaults: {
    ...initPostsStateModel
  }
})
@Injectable()
export class PostsState {
  constructor(private postsSerivce: PostsService) {}

  @Action(GetPosts)
  getPosts(ctx: StateContext<PostsStateModel>, action: GetPosts) {
    ctx.patchState({ posts: null });
    return this.postsSerivce.getPosts(action.language, action.sortBy).pipe(
      tap(posts => {
        if (!posts || !posts.length) {
          throw posts;
        }
        ctx.patchState({ posts });
      }),
      catchError(error => {
        ctx.dispatch(new HandleApiFailure());
        throw error;
      })
    );
  }

  @Action(ChangePostsPageIndex)
  changePostsPageIndex(
    ctx: StateContext<PostsStateModel>,
    action: ChangePostsPageIndex
  ) {
    ctx.patchState({ pageIndex: action.pageIndex });
  }

  @Action(ChangePostsPageSize)
  changePostsPageNumber(
    ctx: StateContext<PostsStateModel>,
    action: ChangePostsPageSize
  ) {
    ctx.patchState({ pageSize: action.pageSize });
  }
}
