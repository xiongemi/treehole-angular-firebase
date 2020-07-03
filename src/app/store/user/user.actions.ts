import { Language } from 'src/app/models/language.type';

export class SetLanguage {
  static readonly type = '[User] Set Language';

  constructor(public language: Language) {}
}

export class LikeAPost {
  static readonly type = '[User] Like a Post';

  constructor(public postId: string) {}
}

export class UnlikeAPost {
  static readonly type = '[User] Unlike a Post';

  constructor(public postId: string) {}
}

export class DislikeAPost {
  static readonly type = '[User] Dislike a Post';

  constructor(public postId: string) {}
}

export class UndislikeAPost {
  static readonly type = '[User] Undislike a Post';

  constructor(public postId: string) {}
}
