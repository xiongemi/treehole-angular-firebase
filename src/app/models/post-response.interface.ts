import { firestore } from 'firebase-admin';

import { Language } from './language.type';
import { Post } from './post.interface';

export interface PostResponse {
  id: string;
  title: string;
  message: string;
  createdAt: firestore.Timestamp;
  uuid: string;
  language: Language;
  parentDocId: string;
  likesCount: number;
  dislikesCount: number;
  commentsCount: number;
}

export function transformPostResponseToPost(postResponse: PostResponse): Post {
  return {
    ...postResponse,
    createdAt: postResponse.createdAt.toDate(),
  };
}
