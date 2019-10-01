import * as crypto from 'crypto';

function hashArgs(encoding: crypto.HexBase64Latin1Encoding) {
  return (context: any, ...args: any[]): string =>
    crypto.createHash('sha1').update(JSON.stringify(args)).digest(encoding!);
};

export function Memoize(hashFunction = hashArgs('base64')) {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    if (!descriptor.value) {
      throw 'Only put a Memoize() decorator on a method';
    }
    descriptor.value = getNewFunction(descriptor.value, hashFunction);

  };
}

const memoSymbol: unique symbol = Symbol('memo');

function getNewFunction(originalMethod: (...args: any[]) => void, hashFunction: (context: any, ...args: any[]) => string) {
  const newFunction = Object.assign(
    function (this: any, ...args: any[]) {

      let cache = newFunction[memoSymbol];

      let hashKey = hashFunction(this, args);

      if (!cache.has(hashKey)) {
        cache.set(hashKey, originalMethod.apply(this, args));
      }
      return cache.get(hashKey);
    }, { 
      [memoSymbol]: new Map<string, any>() 
    }
  );

  return newFunction;
}

