import { Action, AnyAction } from "redux";
import {Dispatcher, dispatcher} from './dispatcher';
import fs from 'fs';

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
  associate(): void {
  }
  disassociate(): void {
  }
  handle(filePath: string) {
    this.dispatcher.addTorrentFile.request({ filePath });
  }


}


export default TorrentFileHandler;