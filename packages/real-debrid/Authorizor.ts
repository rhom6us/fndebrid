import * as api from './api/auth';
import {ArgumentFalsyError, InvalidArgumentError, InvalidOperationError} from './RealDebridError';
import {AccessToken, ClientId, ClientSecret, RefreshToken} from './types';

export interface AuthInfo {
  access_token: AccessToken;
  refresh_token: RefreshToken;
  client_id: ClientId;
  client_secret: ClientSecret;
  expires: number;
}
export interface Store {
  has(key: string): boolean;
  get<T = any>(key: string): T;
  set(key: string, value: any): void;
}
export class Authorizor {
  public get authInfo(): AuthInfo | undefined {
    if (!this._authInfo) {
      if (this.storage.has('auth-info')) this._authInfo = this.storage.get('auth-info');
    }
    return this._authInfo;
  }
  public set authInfo(authInfo: AuthInfo | undefined) {
    if (authInfo) {
      if (!authInfo.access_token) throw new InvalidArgumentError('state', 'access_token is not present');
      if (!authInfo.refresh_token) throw new InvalidArgumentError('state', 'refresh_token is not present');
      if (!authInfo.client_id) throw new InvalidArgumentError('state', 'client_id is not present');
      if (!authInfo.client_secret) throw new InvalidArgumentError('state', 'client_secret is not present');
      if (!authInfo.expires) throw new InvalidArgumentError('state', 'expires is not present');
      this.storage.set('auth-info', authInfo);
      this._authInfo = authInfo;
    }
  }
  // tslint:disable-next-line: variable-name
  private _authInfo: AuthInfo | undefined;
  public constructor(
    private deviceCodeCallback: (url: string) => Promise<void>,
    private readonly storage: Store,
    state?: AuthInfo,
  ) {
    if (!deviceCodeCallback) throw new ArgumentFalsyError('deviceCodeCallback');

    this.authInfo = state;
  }
  public async getToken() {
    while (!this.authInfo) {
      await this._loadState();
    }
    if (Date.now() >= this.authInfo!.expires) {
      await this._refresh();
    }
    return this.authInfo!.access_token;
  }
  private async _loadState() {
    const code = await api.code();
    await this.deviceCodeCallback(code.direct_verification_url);
    if (Date.now() > code.expires) {
      return;
    }
    const credentials = await api.credentials(code);
    if (Date.now() > code.expires) {
      return;
    }
    const token = await api.token({...credentials, code: code.device_code});
    this.authInfo = {...credentials, ...token};
  }
  private async _refresh() {
    if (!this.authInfo) {
      throw new InvalidOperationError('authInfo has not been setup');
    }
    const token = await api.token({...this.authInfo, code: this.authInfo.refresh_token});
    this.authInfo = {...this.authInfo, ...token};
  }
}
