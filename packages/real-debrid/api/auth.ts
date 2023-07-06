import fetch from 'node-fetch';
import { URL, URLSearchParams } from 'url';
import { ArgumentFalsyError } from '../RealDebridError';
import { ClientId, CodeInfo, Credentials, DeviceCode, RefreshToken, TokenInfo } from '../types';
import { makeUrl } from '../util';

const base = new URL('https://api.real-debrid.com/oauth/v2/');
// tslint:disable-next-line: variable-name
const public_client_id = 'X245A4XAIBGVM' as ClientId;
// tslint:disable-next-line: variable-name
export async function code(client_id: ClientId = public_client_id): Promise<CodeInfo> {
  if (!client_id) throw new ArgumentFalsyError('client_id');

  const response = await fetch(makeUrl(base, 'device/code', { client_id, new_credentials: 'yes' }));

  const json = await response.json();

  return {
    ...json,
    interval: json.interval * 1000,
    expires: Date.parse(response.headers.get('Date')!) + json.expires_in * 1000,
  };
}
export function credentials({
  device_code,
  interval,
  expires,
}: {
  device_code: DeviceCode;
  interval: number;
  expires: number;
}): Promise<Credentials> {
  if (!device_code) throw new ArgumentFalsyError('device_code');
  if (!interval) throw new ArgumentFalsyError('interval');
  if (!expires) throw new ArgumentFalsyError('expires');

  if (Date.now() > expires) {
    return Promise.reject('expired');
  }
  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      if (Date.now() > expires) {
        reject('expired');
      }
      const r = await fetch(
        makeUrl(base, 'device/credentials', { client_id: 'X245A4XAIBGVM', code: device_code }),
      );
      if (r.ok) {
        clearInterval(timer);
        resolve(r.json());
      }
    }, interval);
  });
}
export async function token({
  client_id,
  client_secret,
  // tslint:disable-next-line: no-shadowed-variable
  code,
}: Credentials & { code: DeviceCode | RefreshToken }): Promise<TokenInfo> {
  if (!client_id) throw new ArgumentFalsyError('client_id');
  if (!client_secret) throw new ArgumentFalsyError('client_secret');
  if (!code) throw new ArgumentFalsyError('code');

  const response = await fetch(makeUrl(base, 'token'), {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id,
      client_secret,
      code,
      grant_type: 'http://oauth.net/grant_type/device/1.0',
    }),
  });
  const json = await response.json();
  return {
    ...json,
    expires: Date.parse(response.headers.get('Date')!) + 1000 * json.expires_in,
  };
}
