import {ArgumentFalsyError, ArgumentTypeError, ArgumentUndefinedError, InvalidArgumentError} from '../';
import {Ctor} from '../utilTypes';

export function getInstanceTypeName(value: any) {
  if (isUndefined(value)) throw new ArgumentUndefinedError('value');
  if (isObject(value) && !isFunction(value)) {
    return value.constructor.name;
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
export function isFunction(value: any): value is Function {
  return value instanceof Function;
}
export function isObject(value: any): value is Object {
  return value instanceof Object;
}
export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

export function isNull(value: any): value is null {
  return value === null;
}

export function hasNoValue(value: any): value is null | undefined {
  return !!value;
}
export function isString(value: any): value is string {
  return typeof value === 'string';
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
    return parseUrl(value).href == value;
  } catch (error) {
    return false;
  }
}
export function assertString(value: any) {
  if (!isString(value))
    throw new TypeError(
      `Expected a string, got a ${(value && value.constructor && value.constructor.name) || typeof value}`,
    );
}
export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}
