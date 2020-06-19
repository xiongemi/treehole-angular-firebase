import { Comment } from '../models/comment.interface';

export class SaveComment {
  static readonly type = '[Post Details] Save Comment';

  constructor(public comment: Comment, public postId: string) {}
}
