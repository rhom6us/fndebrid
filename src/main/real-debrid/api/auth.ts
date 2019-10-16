import { makeUrl } from '../util';

import { DeviceCode, ClientId, ClientSecret, AccessToken, RefreshToken, TokenInfo, Credentials, CodeInfo } from '..';
import { ArguementFalsyError } from '../../../common';

const base = new URL('https://api.real-debrid.com/oauth/v2/');
const public_client_id = 'X245A4XAIBGVM' as ClientId;
export async function code(client_id: ClientId = public_client_id) : Promise<CodeInfo> {
  if (!client_id) throw new ArguementFalsyError('client_id');

  const response = await fetch(makeUrl(base, 'device/code', { client_id, new_credentials: 'yes' }));

  const json = await response.json();

  return {
    ...json,
    interval: json.interval * 1000,
    expires: new Date(Date.parse(response.headers.get('Date')!) + (json.expires_in * 1000)),
  };
}
export function credentials({ device_code, interval, expires }: { device_code: DeviceCode; interval: number; expires: Date; }): Promise<Credentials> {
  if (!device_code) throw new ArguementFalsyError('device_code');
  if (!interval) throw new ArguementFalsyError('interval');
  if (!expires) throw new ArguementFalsyError('expires');

  if (Date.now() > expires.getTime()) {
    return Promise.reject("expired");
  }
  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      if (Date.now() > expires.getTime()) {
        reject("expired");
      }
      const r = await fetch(makeUrl(base, 'device/credentials', { client_id: 'X245A4XAIBGVM', code: device_code }));
      if (r.ok) {
        clearInterval(timer);
        resolve(r.json());
      }
    }, interval);
  });
}
export async function token({ client_id, client_secret, code }: Credentials & { code: DeviceCode | RefreshToken; }):Promise<TokenInfo> {
  if (!client_id) throw new ArguementFalsyError('client_id');
  if (!client_secret) throw new ArguementFalsyError('client_secret');
  if (!code) throw new ArguementFalsyError('code');

  const response = await fetch(makeUrl(base, 'token'), {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id, client_secret, code, grant_type: 'http://oauth.net/grant_type/device/1.0' })
  });
  const json = await response.json();
  return {
    ...json,
    expires: new Date(Date.parse(response.headers.get('Date')!) + 1000 * json.expires_in),
  };
}

