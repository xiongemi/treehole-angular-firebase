import { Language } from '../../../models/language.type';
import { SortBy } from '../../../models/sort-by.enum';

export class GetPosts {
  static readonly type = '[Posts] Get';

  constructor(public language: Language, public sortBy: SortBy) {}
}

export class ChangePostsPageIndex {
  static readonly type = '[Posts] Change Page Index';

  constructor(public pageIndex: number) {}
}

export class ChangePostsPageSize {
  static readonly type = '[Posts] Change Page Size';

  constructor(public pageSize: number) {}
}
