import { dialog } from "electron";

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