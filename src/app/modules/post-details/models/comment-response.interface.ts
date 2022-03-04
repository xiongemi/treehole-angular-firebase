import { firestore } from 'firebase-admin';

import { Comment } from './comment.interface';

export interface CommentResponse {
  comment: string;
  uuid: string;
  parentDocId: string;
  createdAt: firestore.Timestamp;
  likesCount: number;
  dislikesCount: number;
}

export function transformCommentResponoseToComment(
  commentResponse: CommentResponse
): Comment {
  return {
    ...commentResponse,
    createdAt: commentResponse.createdAt.toDate(),
    shouldShowChildComments: true,
    shouldShowReplyTo: false,
  };
}
