import { Post } from 'src/app/models/post.interface';

export interface PostsStateModel {
  posts: Post[];
  pageIndex: number;
  pageSize: number;
}
