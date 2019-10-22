// import Registry from 'winreg';
import path from 'path';
import { RegistryHive as Registry } from '@fndebrid/common/registry';


async function setAssReg(ns: string, ext: string, execPath: string) {
  const nsPath = Registry.HKCU
    .withPath('Software/Classes')
    .withPath(ns);
  const appPath = await nsPath.withPath('Application').ensure();
  await appPath.withKey('ApplicationCompany').set('REG_SZ', 'Butler Software');
  await appPath.withKey('ApplicationDescription').set('REG_SZ', 'Butler Software');
  await appPath.withKey('ApplicationIcon').set('REG_SZ', path.resolve(__static, 'android-chrome-192x192.png'));
  await appPath.withKey('ApplicationName').set('REG_SZ', 'fnDebrid');
  // await app.withKey('AppUserModelID').set('REG_SZ', 'Microsoft.SkypeApp_kzf8qxf38zg5c!App');
  const iconPath = await nsPath.withPath('DefaultIcon').ensure();
  iconPath.withDefault()
    .set('REG_SZ', path.resolve(__static, 'android-chrome-192x192.png'));
  const commandPath = await nsPath.withPath('Shell/open/command').ensure();
  commandPath.withDefault()
    .set('REG_SZ', `${execPath} "%1"`);
  const extPath = await Registry.HKCU
    .withPath('Software/Classes')
    .withPath(`.${ext.replace(/^\./, '')}`)
    .ensure();
  extPath.withDefault()
    .set('REG_SZ', ns);

  // await setReg(`/Software/Classes/${ns}/shell/open/command`, Registry.DEFAULT_VALUE, `${execPath} "%1"`);
  // await setReg(`/Software/Classes/.${ext.replace(/^\./, '')}`, Registry.DEFAULT_VALUE, ns);
}
async function removeAssReg(ns: string, ext: string) {
  await Registry.HKCU
    .withPath('Software/Classes')
    .withPath(ext)
    .clear();
}
async function isAssReg(ns: string, ext: string) {
  const exists = await Registry.HKCU
    .withPath('Software/Classes')
    .withPath(ext)
    .exists();
  if (!exists) return false;
  const [type, value] = await Registry.HKCU
    .withPath('Software/Classes')
    .withPath(ext)
    .withDefault()
    .get();
  return value == ns;
}


export class TorrentFileHandler {
  private readonly ext: string;
  constructor(private readonly ns: string = `fnDebrid`, ext: string = '.torrent') {
    this.ext = `.${ext.replace(/^\./, '')}`;
  }


  isAssociated() {
    return isAssReg(this.ns, this.ext);
  }
  associate() {
    return setAssReg(this.ns, this.ext, process.execPath);
  }
  disassociate() {
    return removeAssReg(this.ns, this.ext);

  }

}

const instance = new TorrentFileHandler();
export default instance;