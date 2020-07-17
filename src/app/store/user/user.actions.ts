export class LikeAPostComment {
  static readonly type = '[User] Like a Post / Comment';

  constructor(
    public uuid: string,
    public postId: string,
    public commentId?: string
  ) {}
}

export class CancelLikeAPostComment {
  static readonly type = '[User] Cancel Like a Post / Comment';

  constructor(
    public uuid: string,
    public postId: string,
    public commentId?: string
  ) {}
}

export class DislikeAPostComment {
  static readonly type = '[User] Dislike a Post / Comment';

  constructor(
    public uuid: string,
    public postId: string,
    public commentId?: string
  ) {}
}

export class CancelDislikeAPostComment {
  static readonly type = '[User] Cancel Dislike a Post / Comment';

  constructor(
    public uuid: string,
    public postId: string,
    public commentId?: string
  ) {}
}

export class GetUserLikes {
  static readonly type = '[User] Get User Likes';

  constructor(public uuid: string) {}
}

export class GetUserDislikes {
  static readonly type = '[User] Get User Dislikes';

  constructor(public uuid: string) {}
}

export class HandleOnline {
  static readonly type = '[App] Handle Online';
}

export class HandleOffline {
  static readonly type = '[App] Handle Offline';
}
