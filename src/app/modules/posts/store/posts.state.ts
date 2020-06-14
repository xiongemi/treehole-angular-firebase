import { Injectable } from '@angular/core';
import { DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { transformPostResponseToPost } from 'src/app/models/post-response.interface';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from '../services/posts.service';
import { initPostsStateModel } from './post-state-model-init.const';
import { PostsStateModel } from './posts-state-model.interface';
import { GetPosts } from './posts.actions';

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
  feedAnimals(ctx: StateContext<PostsStateModel>, action: GetPosts) {
    ctx.patchState({ posts: null });
    return this.postsSerivce.getPosts(action.language, action.sortBy).pipe(
      tap(docs => {
        const posts: Post[] = docs.map(doc => {
          const post = transformPostResponseToPost(doc.payload.doc.data());
          post.id = doc.payload.doc.id;
          return post;
        });
        ctx.patchState({ posts });
      })
    );
  }
}
