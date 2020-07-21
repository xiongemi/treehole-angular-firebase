import { Post } from 'src/app/models/post.interface';
import { Comment } from '../models/comment.interface';

export interface PostDetailsStateModel {
  post: Post;
  comments: Comment[];
}
