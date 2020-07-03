export class SaveComment {
  static readonly type = '[Post Details] Save Comment';

  constructor(
    public message: string,
    public uuid: string,
    public parentDocId: string,
    public postId: string
  ) {}
}
