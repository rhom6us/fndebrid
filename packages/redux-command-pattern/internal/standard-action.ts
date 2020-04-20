
import { Action as ReduxAction } from 'redux';

export interface StandardAction<TPayload = undefined> extends ReduxAction<string> {
  type: string;
  payload: TPayload;
}
export type StandardActionAny = StandardAction<any>;
