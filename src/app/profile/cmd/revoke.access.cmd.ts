export class RevokeAccessCmd {
  loginUuid: string;
  constructor(loginUuid: string) {
    this.loginUuid = loginUuid;
  }
}
