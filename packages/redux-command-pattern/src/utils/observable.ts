import { Action, Func } from '@rhombus-toolkit/func';

declare global {
  interface SymbolConstructor {
    readonly observable: unique symbol;
  }
}

export type Observer<T> = { next: Action<[T]>; error?: Action<[any]>; complete?: Action<[]> };
export type Unsubscribe = Action<[]>;

/**
 * A minimal observable of state changes.
 * For more information, see the observable proposal:
 * https://github.com/tc39/proposal-observable
 */
export interface Observable<T> {
  /**
   * The minimal observable subscription method.
   * @param {Object} observer Any object that can be used as an observer.
   * The observer object should have a `next` method.
   * @returns {subscription} An object with an `unsubscribe` method that can
   * be used to unsubscribe the observable from the store, and prevent further
   * emission of values from the observable.
   */
  subscribe: Func<[Observer<T>], { unsubscribe: Unsubscribe }>;
  [Symbol.observable](): Observable<T>;
}

export function isObservable(value: any): value is Observable<any> {
  return Symbol.observable in value;
}
