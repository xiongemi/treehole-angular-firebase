import { PostDetailsStateModel } from '../modules/post-details/store/post-details-state-model.interface';
import { PostsStateModel } from '../modules/posts/store/posts-state-model.interface';
import { SettingsStateModel } from './settings/settings-state-model.interface';
import { UserStateModel } from './user/user-state-model.interface';

export interface AppStateModel {
  user: UserStateModel;
  settings: SettingsStateModel;
  posts?: PostsStateModel;
  postDetails?: PostDetailsStateModel;
}
