import { Language } from './language.type';

export interface Post {
  id?: string;
  title: string;
  message: string;
  createdAt: Date;
  uuid: string;
  language: Language;
  likesCount: number;
  dislikesCount: number;
  commentsCount: number;
  doesUserLike?: boolean;
  doesUserDislike?: boolean;
}
