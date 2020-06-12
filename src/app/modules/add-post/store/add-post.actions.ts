import { Language } from 'src/app/models/language.type';

export class SaveAddedPost {
  static readonly type = '[Add Post] Save';

  constructor(
    public title: string,
    public message: string,
    public uuid: string,
    public language: Language
  ) {}
}
