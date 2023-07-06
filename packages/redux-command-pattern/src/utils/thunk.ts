import { Action, AsyncAction } from '@rhombus-toolkit/func';
import { isFunction } from 'lodash';
import { CommandResult } from '../create-command-handler';
import { StandardEventAny } from '../standard-event';

export interface Thunk<T = CommandResult<any, StandardEventAny>> {
  (dispatch: AsyncAction<[commandResult: T]>): void;
}

export function isThunk(value: any): value is Thunk<any> {
  return isFunction(value) && value.length === 1;
}
