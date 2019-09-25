
import {Action, Reducer, Store, AnyAction, Unsubscribe, Observable, Observer,StoreCreator} from 'redux';
import {ipcRenderer, ipcMain} from 'electron';
import * as uuid from 'uuid/v4';

class StoreForward {
    constructor(store: Store<any>){
        ipcMain.on('dispatch', (event, [action])=> {
            event.returnValue = store.dispatch(action);
        });
        ipcMain.on('getState', (event, args)=> {
            event.returnValue = store.getState();
        });
        // let subscribers: [WebContents, string][] = [];
        let listeners: Listener[] = [];
        ipcMain.on('subscribe', (event, [guid]:[string]) => {
            listeners.push(()=>event.reply(`subscription-${guid}`));
            // subscribers.push([event.sender, guid]);
        });
        store.subscribe(()=>{
            listeners.forEach(p => p());
            // subscribers.forEach(([webContents, guid]) => webContents.send(`subscription-${guid}`));
        });
    }

}
new StoreForward(null as any);
interface Listener {
    ():void;
}
function newGuid(){
    return uuid();
}

interface Listener {
    ():void;
}
export class StoreProxy<S = any, A extends Action = AnyAction> implements Store<S, A>{
    public static creator:StoreCreator = <S = any, A extends Action = any>() => new StoreProxy<S,A>();
    private listeners: Listener[] = [];
    private guid = newGuid();
    constructor(){
        
        ipcRenderer.on(`subscription-${this.guid}`, () => {
            this.listeners.forEach(listener => listener());
        });
        ipcRenderer.send('subscribe', this.guid);
    }
    [Symbol.observable](): Observable<S>{
        return {
            subscribe: (observer: Observer<S>) => ({
                unsubscribe: this.subscribe(()=>
                    observer.next && observer.next(this.getState())
                )
            }),
            [Symbol.observable]() {
                return this;
            }
        }
    }
    dispatch<T extends A>(action: T){
        return ipcRenderer.sendSync('dispatch', action);
    }
    getState(): S {
        return ipcRenderer.sendSync('getState');
    }
    replaceReducer(nextReducer: Reducer<S, A>): void {
        throw new Error("Method not supported.");
    }
    subscribe(listener: Listener): Unsubscribe {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            this.listeners = [...this.listeners.slice(0, index), ...this.listeners.slice(index+1)];
        }
    }
}

export default StoreProxy;