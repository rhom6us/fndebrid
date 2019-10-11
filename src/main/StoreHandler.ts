import { ipcMain, WebContents } from "electron";
import { StoreEnhancer, StoreCreator } from "redux";


export const proxyEnhancer: StoreEnhancer = createStore => {
  return (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    const subscribers = new Set<WebContents>();

    store.subscribe(() => {
      Array.from(subscribers).forEach(webContents => webContents.send('store-update'));
    });

    ipcMain.on('dispatch', (event, { action }) => {
      event.returnValue = store.dispatch(action);
    });
    ipcMain.on('getState', (event, args) => {
      event.returnValue = store.getState();
    });
    ipcMain.on('getStateAsync', (event, { replyTo }) => {
      event.reply(`getStateAsync-${replyTo}`, store.getState());
    });
    ipcMain.on('subscribe', (event, [guid]: [string]) => {
      subscribers.add(event.sender);
    });

    return store;
  };
}
// export class StoreHandler {
//   // private listeners: Listener[] = [];
//   private unsubscribeStore: Unsubscribe;
//   private subscribers = new Set<WebContents>();
//   //private subscribers: [WebContents, string][] = [];
//   constructor(private store: Store<any>) {
//     this.unsubscribeStore = this.store.subscribe(() => this.notifyListeners());
//     this.init();
//   }
//   notifyListeners() {
//     Array.from(this.subscribers)
//       .forEach(webContents => {
//         webContents.send('store-update');
//       });
//   }
//   init() {
//     ipcMain.on('dispatch', (event, { action }) => {
//       event.returnValue = this.store.dispatch(action);
//     });
//     ipcMain.on('getState', (event, args) => {
//       event.returnValue = this.store.getState();
//     });
//     ipcMain.on('getStateAsync', (event, { replyTo }) => {
//       event.reply(`getStateAsync-${replyTo}`, this.store.getState());
//     });
//     ipcMain.on('subscribe', (event, [guid]: [string]) => {
//       this.subscribers.add(event.sender);
//     });

//   }
//   dispose() {
//     this.unsubscribeStore();
//   }
// }
// export default StoreHandler;    
