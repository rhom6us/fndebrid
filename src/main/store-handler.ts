import { Store } from "redux";

import { ipcMain } from "electron";

interface Listener {
    ():void;
}

export function setup(store: Store<any>){
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