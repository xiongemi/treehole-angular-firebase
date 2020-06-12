import { Language } from 'src/app/models/language.type';

export class GetPosts {
  static readonly type = '[Posts] Get';

  constructor(public language: Language) {}
}
