import { get } from 'lodash';
import { Store } from 'redux';
import { types } from 'util';
import { StandardActionAny } from './';
import { StandardCommand } from './standard-command';
import { DeepDictionary, DeepDictionaryItem, restify, Restify } from './utils';

type Func<TArgs, TResult = void> = (...args: TArgs extends any[] ? TArgs : [TArgs]) => TResult;

type CommandGenerator<TState> = Generator<StandardActionAny, StandardActionAny | undefined, TState>;
type AsyncCommandGenerator<TState> = AsyncGenerator<StandardActionAny, StandardActionAny | undefined, TState>;

type CommandIterator<TState> = Iterator<StandardActionAny, StandardActionAny | undefined, TState>;
type AsyncCommandIterator<TState> = AsyncIterator<StandardActionAny, StandardActionAny | undefined, TState>;
type CommandIterable = Iterable<StandardActionAny>;
type AsyncCommandIterable = AsyncIterable<StandardActionAny>;
type AllCommandResultTypes<TState> =
  | CommandGenerator<TState>
  | AsyncCommandGenerator<TState>
  | CommandIterable
  | AsyncCommandIterable;
type CommandResult<TState> = void | undefined | StandardActionAny | AllCommandResultTypes<TState> | Array<AllCommandResultTypes<TState>>;

export type CommandFn<TState = any, TPayload = undefined> =
  (state:TState, ...payload:Restify<TPayload>) => CommandResult<TState> | PromiseLike<CommandResult<TState>>


export type CommandFnAny = CommandFn<any, any>;


// export type CommandFnMap<TState = any> = DeepDictionary<CommandFn<TState, any>>

// export type CommandFnOrMap<TState = any> = CommandFn<TState, any> | CommandFnMap<TState>;

export type InferState<TCommandFnOrMap extends DeepDictionaryItem<CommandFn<any, any>>> = TCommandFnOrMap extends DeepDictionaryItem<CommandFn<infer TState, any>>
  ? TState
  : never;
export type InferPayload<TCommandFn extends CommandFn<any, any>> = TCommandFn extends CommandFn<any, infer TPayload> ? TPayload : never;


function getIteratorFn(value: any): Func<[], Iterator<any> | AsyncIterator<any>> {
  return value[Symbol.iterator] || value[Symbol.asyncIterator];
}
export function createCommandHandler<T extends DeepDictionary<CommandFn<any, any>>>(store: Store<any,any>, implementation: T) {
  type State = InferState<T>;
  return async function handleCommand({ type, payload }: StandardCommand<any>): Promise<void> {
    const fn = get(implementation, type) as any;
    const result = (await fn(store.getState(), ...restify(payload))) as
      | CommandGenerator<State>
      | AsyncCommandGenerator<State>
      | StandardCommand<any>
      | undefined;
    if (!result) {
      return;
    }

    const iter = getIteratorFn(result)() as CommandIterator<State> | AsyncCommandIterator<State>;
    if (!iter) { // result is not iterable. see if it's a command on its own.
      if ("type" in result) {
        store.dispatch(result);
      }
      return;
    }
    let current: IteratorResult<StandardCommand>;
    while (!(current = await iter.next(store.getState())).done) {
      if (current.value) {
        store.dispatch(current.value);
      }
    }
    if (iter.return) {
      current = await iter.return(store.getState());
      if (current.value) {
        store.dispatch(current.value);
      }
    }
  };
}
