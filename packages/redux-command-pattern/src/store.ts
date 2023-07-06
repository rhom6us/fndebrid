import { Store as ReduxStore } from './external/redux';
import { StandardEventAny } from './standard-event';

/**
 * A store is an object that holds the application's state tree.
 * There should only be a single store in a Redux app, as the composition
 * happens on the reducer level.
 *
 * @template TState The type of state held by this store.
 * @template TAction the type of actions which may be dispatched by this store.
 */
export type Store<TState = any, TAction extends StandardEventAny = StandardEventAny> = ReduxStore<TState, TAction>;
export type Dispatch<TEvent extends StandardEventAny = StandardEventAny> = Store<any, TEvent>['dispatch'];
