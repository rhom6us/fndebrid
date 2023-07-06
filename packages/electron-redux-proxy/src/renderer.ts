import {ipcRenderer} from 'electron';
import {Action, AnyAction, Observable, Observer, Reducer, Store, Unsubscribe} from 'redux';

type Listener = () => void;

type Logger = (...args: any[]) => void;

interface IOptions {
  logger?: Logger;
}
export function createStore<S = any, A extends Action = AnyAction>({logger}: IOptions = {}): Store<S, A> {
  function log(...args: any) {
    if (logger) {
      logger(...args);
    }
  }
  const listeners = new Set<Listener>();

  ipcRenderer.on('store-update', () => {
    log('store-update');
    listeners.forEach(listener => listener());
  });
  ipcRenderer.send('subscribe');

  return {
    dispatch<T extends A>(action: T): T {
      log({dispatch: action});
      return ipcRenderer.sendSync('dispatch', {action});
    },
    getState(): S {
      const result = ipcRenderer.sendSync('getState');
      log({getState: result});
      return result;
    },
    replaceReducer(nextReducer: Reducer<S, A>): void {
      throw new Error('Method not supported.');
    },
    subscribe(listener: Listener): Unsubscribe {
      log({subscribe: listener});
      listeners.add(listener);
      return () => {
        log({unsubscribe: listener});
        listeners.delete(listener);
      };
    },
    [Symbol.observable](): Observable<S> {
      return {
        subscribe: (observer: Observer<S>) => ({
          unsubscribe: this.subscribe(() => observer.next && observer.next(this.getState())),
        }),
        [Symbol.observable]() {
          return this;
        },
      };
    },
  };
}
// export class StoreProxy<S = any, A extends Action = AnyAction> implements Store<S, A>{
//   private readonly listeners: Listener[] = [];
//   constructor(private readonly logger: Logger = () => { }) {

//     ipcRenderer.on('store-update', () => {
//       this.logger('store-update');
//       this.listeners.forEach(listener => listener());
//     });
//     ipcRenderer.send('subscribe');
//   }
//   [Symbol.observable](): Observable<S> {
//     return {
//       subscribe: (observer: Observer<S>) => ({
//         unsubscribe: this.subscribe(() =>
//           observer.next && observer.next(this.getState())
//         )
//       }),
//       [Symbol.observable]() {
//         return this;
//       }
//     }
//   }
//   dispatch<T extends A>(action: T) {
//     this.logger({ dispatch: action });
//     return ipcRenderer.sendSync('dispatch', { action });
//   }
//   getState(): S {
//     const result = ipcRenderer.sendSync('getState');
//     this.logger({ getState: result });
//     return result;
//   }
//   replaceReducer(nextReducer: Reducer<S, A>): void {
//     throw new Error("Method not supported.");
//   }
//   subscribe(listener: Listener): Unsubscribe {
//     this.logger({ subscribe: listener });
//     return () => {
//       this.logger({ unsubscribe: listener });
//       const index = this.listeners.indexOf(listener);
//       this.listeners.splice(index - 1, 1);
//     }
//   }
// }

// export default StoreProxy;
