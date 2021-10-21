import { assertNever, InvalidArgumentError, isString, isUndefined, isURL, Opaque, parseUrl, tryParseUrl } from '@fndebrid/core';
import { URL } from 'url';
import uuid4 from 'uuid/v4';
import uuid5 from 'uuid/v5';


export type JobId = Opaque<string, 'jobId'>;

export function JobId(jobId: string) {
  return jobId as JobId;
}
export function jobId(url?: URL | string): JobId {
  if (isUndefined(url)) {
    return uuid4() as JobId;
  }
  if (isString(url)) {
    return jobId(parseUrl(url));
  }
  if (isURL(url)) {
    return uuid5(url.href, uuid5.URL) as JobId;
  }
  return assertNever(url);
}
