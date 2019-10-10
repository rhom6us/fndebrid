import { Action, AnyAction } from "redux";
import { Dispatcher, dispatcher } from './dispatcher';
import fs from 'fs';
import Registry from 'winreg';
import path from 'path';

interface IDispatch {
  (action: AnyAction): void;
}



function findFilePath(argv: string[]): string | undefined {
  let matches = argv.reverse().filter(p => fs.lstatSync(p).isFile());
  if (matches.length > 1) {
    throw new Error('multiple protocol matches found in argv. Don\'t know what to do...');
  }
  return matches[0];
}

function setDefaultReg(key: string, value: string) {
  return new Promise((resolve, reject) => {
    new Registry({
      hive: Registry.HKCU,
      key: key.replace('/', '\\')
    }).set(
      Registry.DEFAULT_VALUE, Registry.REG_SZ, 'value',
      error => error ? reject(error) : resolve()
    );
  });
}

async function setReg(ns: string, ext: string, execPath: string) {

  await setDefaultReg(`/Software/Classes/${ns}/shell/open/command`, `${execPath} "%1"`);
  await setDefaultReg(`/Software/Classes/.${ext.replace(/^\./, '')}`, ns);
}


export class TorrentFileHandler {
  constructor(private dispatcher: Dispatcher) {

    // let filePath = findFilePath(process.argv);
    // if (filePath) {
    //   this.handle(filePath);
    // }
  }


  get isAssociated(): boolean {
    return false;
  }
  associate() {
    return setReg(`butlersoftware.fn-debrid.v1`, '.torrent', process.execPath);
  }
  disassociate(): void {
  }
  handle(filePath: string) {
    this.dispatcher.addTorrentFile.request({ filePath });
  }


}


export default TorrentFileHandler;