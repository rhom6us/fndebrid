import { ArguementFalsyError, InvalidArguementError, InvalidOperationError } from '../../common';
import * as api from './api/auth';
import { AccessToken, ClientId, ClientSecret, RefreshToken } from './types';
interface AuthInfo {
  access_token: AccessToken;
  refresh_token: RefreshToken;
  client_id: ClientId;
  client_secret: ClientSecret;
  expires: Date;
}
export class Authorizor {
  public constructor(private deviceCodeCallback: (url: string) => Promise<void>, state?: AuthInfo) {
    if (!deviceCodeCallback) throw new ArguementFalsyError('deviceCodeCallback');
    this.authInfo = state;
  }
  private _authInfo: AuthInfo | undefined;
  public get authInfo(): AuthInfo | undefined {
    return this._authInfo;
  }
  public set authInfo(authInfo: AuthInfo | undefined) {
    if (authInfo) {
      if (!authInfo.access_token) throw new InvalidArguementError('state', 'access_token is not present');
      if (!authInfo.refresh_token) throw new InvalidArguementError('state', 'refresh_token is not present');
      if (!authInfo.client_id) throw new InvalidArguementError('state', 'client_id is not present');
      if (!authInfo.client_secret) throw new InvalidArguementError('state', 'client_secret is not present');
      if (!authInfo.expires) throw new InvalidArguementError('state', 'expires is not present');
    }
    this._authInfo = authInfo;
  }
  private async _loadState() {
    const code = await api.code();
    await this.deviceCodeCallback(code.direct_verification_url);
    if (Date.now() > code.expires.getTime()) {
      return;
    }
    const credentials = await api.credentials(code);
    if (Date.now() > code.expires.getTime()) {
      return;
    }
    const token = await api.token({ ...credentials, code: code.device_code });
    this.authInfo = { ...credentials, ...token };
  }
  private async _refresh() {
    if (!this.authInfo) {
      throw new InvalidOperationError('authInfo has not been setup');
    }
    const token = await api.token({ ...this.authInfo, code: this.authInfo.refresh_token });
    this.authInfo = { ...this.authInfo, ...token };
  }
  public async getToken() {
    while (!this.authInfo) {
      await this._loadState();
    }
    if (Date.now() >= this.authInfo!.expires.getTime()) {
      await this._refresh();
    }
    return this.authInfo!.access_token;

  }
}
