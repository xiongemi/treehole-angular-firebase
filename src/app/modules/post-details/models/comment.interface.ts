export interface Comment {
  id?: string;
  comment: string;
  uuid: string;
  parentDocId: string;
  createdAt: Date;
  likesCount: number;
  dislikesCount: number;
  shouldShowReplyTo?: boolean;
  shouldShowChildComments?: boolean;
  childComments?: Comment[];
  doesUserLike?: boolean;
  doesUserDislike?: boolean;
}
