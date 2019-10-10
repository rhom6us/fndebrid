import WinReg from 'winreg';

export type KeyType = 'REG_SZ' | 'REG_MULTI_SZ' | 'REG_EXPAND_SZ' | 'REG_DWORD' | 'REG_QWORD' | 'REG_BINARY' | 'REG_NONE';
export type Hive = 'HKLM' | 'HKCU' | 'HKCR' | 'HKU' | 'HKCC';


export interface RegistryKey {
  get(): Promise<[KeyType, string]>;
  set(type: KeyType, value: string): Promise<RegistryKey>;
  exists(): Promise<boolean>;
  remove(): Promise<RegistryPath>;
}
class _RegistryKey implements RegistryKey {

  async set(type: KeyType, value: string): Promise<RegistryKey> {
    
    return new Promise((resolve, reject) => {
      this.winreg.set(this.name, type, value, (error) => error ? reject(error) : resolve(this));
    });
  }


  exists(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.winreg.valueExists(this.name, (error, result) => error ? reject(error) : resolve(result));
    });
  }
  remove(): Promise<RegistryPath> {
    return new Promise((resolve, reject) => {
      this.winreg.remove(this.name, (error) => error ? reject(error) : resolve(this.parent));
    });
  }
  constructor(private winreg: WinReg.Registry, public readonly parent: RegistryPath, public readonly name: string) {

  }
  get(): Promise<[KeyType, string]> {
    return new Promise((resolve, reject) => {
      this.winreg.get(this.name, (error, result) => error ? reject(error) : resolve([result.type as KeyType, result.value]));
    });
  }
}
function cleanPath(path: string){
  return path.replace('/', '\\') //change slash to whack
  .replace(/\\+(?=\\)/, '') //remove repeated whacks
  .replace(/^(?!\\)/, '\\') //ensure leading whack
  .replace(/\\$/, '') // remove trailing whack
}
export class RegistryPath {
  
  protected readonly winreg: WinReg.Registry;
  public get hive(){
    return this.winreg.hive as Hive;
  }
  public get path(){
    return this.winreg.key;
  }
  public get parent(){
    return new RegistryPath(this.winreg.parent);
  }
  protected constructor(options: {hive: Hive,  path: string} | WinReg.Registry) {
    if(options instanceof WinReg){
      this.winreg = options;
    } else {
      this.winreg = new WinReg({
        hive: options.hive,
        key: cleanPath(options.path)
      });
    } 
  }
  public has(path: string) {
    return this.withPath(path).exists();
  }
  public withPath(path: string) {
    if (!path)
      return this;
      
    return new RegistryPath({hive:this.hive, path:[this.path, cleanPath(path)].join('')});
  }
  exists(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.winreg.keyExists(((error, exists) => error ? reject(error) : resolve(exists)));
    })
  }
  withKey(name: string): RegistryKey {
    return new _RegistryKey(this.winreg, this, name);
  }
  withDefault(): RegistryKey {
    return this.withKey(WinReg.DEFAULT_VALUE);
  }

  remove() {
    return new Promise((resolve, reject) => {
      this.winreg.destroy(error => error ? reject(error) : resolve());
    });
  }
  clear() {
    return new Promise((resolve, reject) => {
      this.winreg.clear(error => error ? reject(error) : resolve());
    });
  }
  create() {
    return new Promise((resolve, reject) => {
      this.winreg.create(error => error ? reject(error) : resolve());
    });
  }
  async ensure(){
    if(!(await this.exists())){
      await this.create();
    }
    return this;

  }
}


export class RegistryHive extends RegistryPath {
  public static HKCU = new RegistryHive('HKCU');
  private constructor(hive: Hive) {
    super({hive, path: ''});
  }

}