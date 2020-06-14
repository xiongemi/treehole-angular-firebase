export class HandleApiFailure {
  static readonly type = '[App] Handle Api Failure';

  constructor(public customMessage?: string) {}
}

export class HandleApiSuccess {
  static readonly type = '[App] Handle Api Success';

  constructor(public customMessage?: string) {}
}
