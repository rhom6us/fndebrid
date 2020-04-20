import { LegitTuple } from './tuple';

export type Restify<T> =
  T extends undefined ? [] :
  T extends LegitTuple ? T :
  [T];
export function restify<T>(arg: T):Restify<T> {
  if (arg === undefined) {
    return [] as Restify<T>;
  }
  if (Array.isArray(arg)) {
    return arg as Restify<T>;
  }
  return [arg] as Restify<T>;
}


export type UnRestify<T extends any[]> =
  T extends [] ? undefined :
  T extends [infer R] | [infer Q] ? R | Q :
	T extends [infer R] ?  R :
	T extends any[] ?  T :
  never;

export function unrestify<T extends any[]>(arg: T): UnRestify<T> {
  if (!Array.isArray(arg)) {
    throw new TypeError("Value must be an array");
  }
  switch (arg.length) {
    case 0:
      return undefined as UnRestify<T>;
    case 1:
      return arg[0] as UnRestify<T>;
    default:
      return arg as UnRestify<T>;
  }
}
