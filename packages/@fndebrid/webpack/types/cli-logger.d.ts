declare module 'cli-logger' {
  function log({
    name: string,
  }): {
    info(msg: any): void;
    warn(msg: any): void;
    error(msg: any): void;
  };
  export = log;
}
