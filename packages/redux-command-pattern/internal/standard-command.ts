
import { Action as ReduxCommand } from 'redux';

export interface StandardCommand<TPayload = undefined> extends ReduxCommand<string> {
  type: string;
  payload: TPayload;
}
