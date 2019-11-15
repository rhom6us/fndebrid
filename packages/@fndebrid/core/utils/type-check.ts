import {URL} from 'url';
import {types} from 'util';
import {ArgumentFalsyError, ArgumentTypeError, ArgumentUndefinedError, InvalidArgumentError} from '../';
import {Ctor} from '../utilTypes';

export const {isDate, isMap, isPromise, isSet, isNativeError, isRegExp} = (types as unknown) as {
  isDate: (value: any) => value is Date;
  isMap: (value: any) => value is Map<any, any>;
  isPromise: (value: any) => value is Promise<any>;
  isSet: (value: any) => value is Set<any>;
  isNativeError: (value: any) => value is Error;
  isRegExp: (value: any) => value is RegExp;
};

export function getInstanceTypeName(value: any) {
  if (isUndefined(value)) throw new ArgumentUndefinedError('value');
  if (isObject(value) && !isFunction(value)) {
    return getClass(value).name;
  }
  if (isConstructor(value)) {
    return 'constructor';
  }
  return typeof value;
}
export function isConstructor(value: any) {
  return isFunction(value) && 'prototype' in value && /^[A-Z]/.test(value.name);
}
export function getClassName(value: Ctor) {
  if (!value) throw new ArgumentFalsyError('value');
  if (!isConstructor(value)) throw new ArgumentTypeError('value', 'constructor', value);
  return value.name;
}

export function getClass<T extends Object>(value: T) {
  return value.constructor as new (...args: any[]) => T;
}
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}
export function isNullOrUndefined(value: any): value is null | undefined {
  return isNull(value) || isNullOrUndefined(value);
}
export function isNull(value: any): value is null {
  return value === null;
}
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}
export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

export function isObject(value: any): value is object {
  return value !== null && typeof value === 'object';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}
export function tryParseUrl(value: string, out: [] | [URL]): out is [URL] {
  try {
    out[0] = parseUrl(value);
    return true;
  } catch (error) {
    out[0] = undefined;
    return false;
  }
}
export function parseUrl(value: string) {
  if (!value) throw new ArgumentFalsyError('value');
  if (!isString(value)) throw new ArgumentTypeError('value', 'string', value);
  try {
    return new URL(value);
  } catch (error) {
    throw new InvalidArgumentError('url', 'The given value is not a proper url');
  }
}
export function validUrl(value: string) {
  try {
    const out: [] | [URL] = [];
    if (tryParseUrl(value, out)) {
      return out[0].href === value;
    }
  } catch (error) {}
  return false;
}
export function assertString(value: any): value is string {
  if (!isString(value))
    throw new TypeError(`Expected a string, got a ${(value && value.constructor && value.constructor.name) || typeof value}`);
  return true;
}
export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}
