import { Language } from 'src/app/models/language.type';
import { SortBy } from '../models/sort-by.enum';

export class GetPosts {
  static readonly type = '[Posts] Get';

  constructor(public language: Language, public sortBy: SortBy) {}
}
