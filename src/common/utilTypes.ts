  
  export type Await<T> = T extends Promise<infer U> ? U : T;

  export type Yield<T> = T extends Promise<unknown> ? Await<T> :
    T extends (...args: any[]) => Promise<unknown> ? Await<ReturnType<T>> :
    T extends (...args: any[]) => unknown ? ReturnType<T> :
    T;