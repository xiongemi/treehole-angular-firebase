import { PostsStateModel } from '../modules/posts/store/posts-state-model.interface';
import { UserStateModel } from './user/user-state-model.interface';

export interface AppStateModel {
  user: UserStateModel;
  posts?: PostsStateModel;
}
