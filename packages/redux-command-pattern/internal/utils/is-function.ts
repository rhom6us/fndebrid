// tslint:disable-next-line: ban-types
export function isFunction(value: any): value is (...args: any) => any & Function {
  return typeof value === 'function';
}
