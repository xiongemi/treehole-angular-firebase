import { Timestamp } from 'firebase/firestore-types';

import { Comment } from './comment.interface';

export interface CommentResponse {
  comment: string;
  uuid: string;
  parentDocId: string;
  createdAt: Timestamp;
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
    shouldShowReplyTo: false
  };
}
