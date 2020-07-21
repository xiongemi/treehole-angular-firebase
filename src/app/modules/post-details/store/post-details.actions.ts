import { SortBy } from 'src/app/models/sort-by.enum';

export class GetPostDetails {
  static readonly type = '[Post Details] Get';

  constructor(public postId: string) {}
}

export class GetPostComments {
  static readonly type = '[Post Details] Get Post Comments';

  constructor(public postId: string, public sortBy: SortBy) {}
}
