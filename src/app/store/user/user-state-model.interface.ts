import { LikeResponse } from 'src/app/models/like-response.interface';

export interface UserStateModel {
  likes: LikeResponse[];
  dislikes: LikeResponse[];
  isOnline: boolean;
}
