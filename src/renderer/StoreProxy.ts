
import { Action, Reducer, Store, AnyAction, Unsubscribe, Observable, Observer, StoreCreator } from 'redux';
import { ipcRenderer } from 'electron';
import * as uuid from 'uuid/v4';


function newGuid() {
  return uuid();
}

interface Listener {
  (): void;
}
export class StoreProxy<S = any, A extends Action = AnyAction> implements Store<S, A>{
  public static creator: StoreCreator = <S = any, A extends Action = any>() => new StoreProxy<S, A>();
  private listeners: Listener[] = [];
  private guid = newGuid();
  constructor() {

    ipcRenderer.on('store-update', () => {
      console.log('store-update');
      this.listeners.forEach(listener => listener());
    });
    ipcRenderer.send('subscribe', this.guid);
  }
  [Symbol.observable](): Observable<S> {
    return {
      subscribe: (observer: Observer<S>) => ({
        unsubscribe: this.subscribe(() =>
          observer.next && observer.next(this.getState())
        )
      }),
      [Symbol.observable]() {
        return this;
      }
    }
  }
  dispatch<T extends A>(action: T) {
    console.log({dispatch:action});
    return ipcRenderer.sendSync('dispatch', {action});
  }
  getState(): S {
    const result = ipcRenderer.sendSync('getState');
    console.log({getState: result});
    return result;
  }
  getStateAsync(){
    return new Promise((resolve, reject) => {
      const replyTo = uuid();
      ipcRenderer.once(`getStateAsync-${replyTo}`, (event, {store})=> resolve(store));
      ipcRenderer.send('getStateAsync', {replyTo});
    });
  }
  replaceReducer(nextReducer: Reducer<S, A>): void {
    throw new Error("Method not supported.");
  }
  subscribe(listener: Listener): Unsubscribe {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      this.listeners = [...this.listeners.slice(0, index), ...this.listeners.slice(index + 1)];
    }
  }
}

export default StoreProxy;