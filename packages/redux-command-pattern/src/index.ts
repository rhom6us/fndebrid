import { DeepDictionary, DeepDictionaryItem } from '@rhombus-toolkit/type-helpers';
import { CommandFn, createCommandHandler } from './create-command-handler';
import { createReducer } from './createReducer';
import { EventTypes, getEventCreator } from './event-creator';
import { getCommands } from './get-commands';
import { ReducerFn, ReducerFnAny } from './reducer-fn';
import { Store } from './store';

export type { AsyncCommandGenerator, CommandGenerator, CommandResult } from './create-command-handler';
export type { StandardEvent, StandardEventAny } from './standard-event';
export type { Thunk } from './utils';
export type { ReducerFn, CommandFn };
export { createCommandHandler, getCommands };

export function parseReducers<TReducers extends DeepDictionary<ReducerFnAny>>(reducers: TReducers) {
  const reducer = createReducer(reducers);
  const events = getEventCreator(reducers);
  return [reducer, events] as const;
}
export function parseCommands<
  TReducers extends DeepDictionaryItem<ReducerFnAny>,
  TCommands extends DeepDictionary<CommandFn</*InferState<TReducers>*/ any, any, EventTypes<TReducers>>>,
>(implementation: TCommands, store: Store, reducers?: TReducers) {
  const handler = createCommandHandler(store, implementation);
  const commands = getCommands<TCommands>(handler);
  return commands;
}

// export function getCommandParsers<Commands extends DeepDictionary<CommandFnAny>>(implementation:Commands){
//     const getHandler = (store: InferStore<Commands>) => createCommandHandler(store, implementation);
//     const gc = (handler:ReturnType<typeof getHandler>) => getCommands(handler);
//     return [getHandler, gc] as const;
// }
