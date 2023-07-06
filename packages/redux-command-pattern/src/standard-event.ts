
import { isFunction, isString } from 'lodash';
import type { Action as ReduxAction } from './external/redux';

export type EventType = string;
export interface StandardEvent<TPayload, TEventType> extends ReduxAction<TEventType> {
  payload: TPayload;
}
export type StandardEventAny = StandardEvent<any, any>;

export function isStandardEvent(value: any): value is StandardEventAny {
  return !isFunction(value) && value.type && isString(value.type);
}
