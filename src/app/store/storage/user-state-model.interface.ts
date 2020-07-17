import { Language } from './node_modules/src/app/models/language.type';
import { LikeResponse } from './node_modules/src/app/models/like-response.interface';

export interface UserStateModel {
  language: Language;
  uuid: string;
  likes: LikeResponse[];
  dislikes: LikeResponse[];
  isOnline: boolean;
}
