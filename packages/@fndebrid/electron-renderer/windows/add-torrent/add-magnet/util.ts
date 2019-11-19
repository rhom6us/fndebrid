import { clipboard } from 'electron';

export function tryReadClipboard() {
  try {
    const clipText = clipboard.readText();
    if (isMagnetLink(clipText)) {
      return clipText;
    }
    // tslint:disable-next-line: no-empty
  } catch (error) {}
  return '';
}
export function isMagnetLink(magnet: string) {
  try {
    const url = new URL(magnet);
    return url.protocol === 'magnet:';
    // tslint:disable-next-line: no-empty
  } catch (e) {}
  return false;
}
