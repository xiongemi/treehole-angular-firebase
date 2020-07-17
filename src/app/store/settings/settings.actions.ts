import { Language } from 'src/app/models/language.type';

export class SetLanguage {
  static readonly type = '[User] Set Language';

  constructor(public language: Language) {}
}
