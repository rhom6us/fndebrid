import { Action, AnyAction } from "redux";
import { app } from "electron";
import * as path from 'path';
import * as fs from 'fs';
import { addTorrentFile } from "./store/torrents/actions";

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


export default TorrentFileHandler;
export class TorrentFileHandler {
  constructor(private dispatch: IDispatch) {

    let filePath = findFilePath(process.argv);
    if (filePath) {
      this.handle(filePath);
    }
  }


  get isAssociated(): boolean {
    throw new Error('Not implemented');
  }
  associate(): boolean {
    throw new Error('Not implemented');
  }
  disassociate(): boolean {
    throw new Error('Not implemented');
  }
  handle(filePath: string) {
    this.dispatch(addTorrentFile.request({ filePath }));
  }


}