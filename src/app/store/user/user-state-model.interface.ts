import { Language } from 'src/app/models/language.type';
import { LikeResponse } from 'src/app/models/like-response.interface';

export interface UserStateModel {
  language: Language;
  uuid: string;
  likes: LikeResponse[];
  dislikes: LikeResponse[];
}
