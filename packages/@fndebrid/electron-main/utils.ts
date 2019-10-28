import { dialog } from "electron";
// import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import fs from 'fs';
// import shell from 'node-powershell';
import util from 'util';


// export * from '@fndebrid/core'/utils';


export function alert(message: any): void {
  if (typeof message !== "string") {
    dialog.showMessageBox({ message: JSON.stringify(message) });
  } else {
    dialog.showMessageBox({ message });
  }
}

export function showArray(arr: string[]) {
  arr.forEach(alert);
}


// export async function installDevTool(ext: Parameters<typeof installExtension>[0]) {
//   try {
//      const name = await installExtension(ext);
//      console.log(`Added Extension:  ${name}`);
//   } catch (err) {
//     console.log('An error occurred: ', err)
//   }
// }
// export const installReactDevTools = () => installDevTool(REACT_DEVELOPER_TOOLS);
// export const installReduxDevTools = () => installDevTool(REDUX_DEVTOOLS);


// export  function killElectronWebpackDevServer() {
//   let ps = new shell({ executionPolicy: 'Bypass', noProfile: true });
//   ps.addCommand(`wmic Path win32_process Where "CommandLine Like '%webpack-dev-server%'" Call Terminate`);
//   return ps.invoke();

// }

export const deleteDir = util.promisify(fs.rmdir);
