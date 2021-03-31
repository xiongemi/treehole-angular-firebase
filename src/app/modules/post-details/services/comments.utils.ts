import { Comment } from '../models/comment.interface';

export function buildCommentsToTree(comments: Comment[], postId: string) {
  const commentsTree: Comment[] = comments.filter(
    comment => comment.parentDocId === postId
  );
  commentsTree.forEach(comment => buildComments(comments, comment));
  return commentsTree;
}

function buildComments(comments: Comment[], parentComment: Comment) {
  parentComment.childComments = comments.filter(
    comment => comment.parentDocId === parentComment.id
  );
  parentComment.childComments.forEach(comment => {
    buildComments(comments, comment);
  });
}
