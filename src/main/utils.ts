import { dialog, App } from "electron";
import shell from 'node-powershell';


// export * from '../common/utils';


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

export  function killElectronWebpackDevServer() {
  let ps = new shell({ executionPolicy: 'Bypass', noProfile: true });
  ps.addCommand(`wmic Path win32_process Where "CommandLine Like '%webpack-dev-server%'" Call Terminate`);
  return ps.invoke();

}