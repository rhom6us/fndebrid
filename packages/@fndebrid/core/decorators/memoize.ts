import * as crypto from 'crypto';

interface CacheKeySelector {
  (...args: any[]): any;
}
function hashArgs(encoding: crypto.HexBase64Latin1Encoding) {
  return (...args: any[]): string => crypto.createHash('sha1').update(JSON.stringify(args)).digest(encoding!);
}

export function Memoize(keySelector: CacheKeySelector = hashArgs('base64')) {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    if (!descriptor.value) {
      throw 'Only put a Memoize() decorator on a method';
    }
    descriptor.value = getNewFunction(descriptor.value, keySelector);
  };
}

const memoSymbol: unique symbol = Symbol('memo');

function getNewFunction(originalMethod: (...args: any[]) => void, keySelector: CacheKeySelector) {
  const newFunction = Object.assign(
    function (this: any, ...args: any[]) {
      let cache = newFunction[memoSymbol];

      let hashKey = keySelector.apply(this, args);

      if (!cache.has(hashKey)) {
        cache.set(hashKey, originalMethod.apply(this, args));
      }
      return cache.get(hashKey);
    },
    {
      [memoSymbol]: new Map<any, any>(),
    },
  );

  return newFunction;
}
