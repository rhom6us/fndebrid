import { Cast, DeepDictionary, DeepDictionaryItem, Inc, restify, unrestify } from "@rhombus-toolkit/type-helpers";
import { InferPayload, ReducerFnAny } from './reducer-fn';
import { StandardEvent } from './standard-event';

type EventCreator<TReducerFn extends ReducerFnAny, Name extends string> = (...payload: restify<InferPayload<TReducerFn>>) => StandardEvent<InferPayload<TReducerFn>, Name>;

export type EventCreatorOrMap<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>, NameAcc extends string = ''> =
  TReducerFnOrMap extends ReducerFnAny ? EventCreator<TReducerFnOrMap, NameAcc> :
  TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? {
    [K in keyof TReducerFnOrMap]: EventCreatorOrMap<TReducerFnOrMap[K], NameAcc extends '' ? K : `${NameAcc}.${Cast<K, string>}`>;
  } :
  never;
export function getEventCreator<TReducers extends DeepDictionaryItem<ReducerFnAny>>(reducers: TReducers, prefix: string[] = []): EventCreatorOrMap<TReducers> {
  const result: any = {};
  if (typeof reducers === 'function') {
    const [argNames] = /(?<=^\w+\()((?:\w+,)*\w+,?)(?=\))/.exec(reducers.toString().replace(/[\r\n\s]+/g, '').replace(/^function(?=\w)/, ''))!;
    const [, ...payloadArgNames] = argNames.split(/,\s*/);

    return function (...args: any[]) {
      return {
        type: `${prefix.join('.')}`,
        payload: unrestify(args),
      };
    } as any;
    
    // we do it this way so that the redux devtools 'dispatch' feature can read the argument names
    // return new Function(...payloadArgNames, `
    //     return {
    //       type: '${prefix.join('.')}',
    //       payload: (${unrestify.toString()})(Array.from(arguments))
    //   };`) as any;
  }
  for (const key in reducers) {
    result[key] = getEventCreator((reducers as any)[key], [...prefix, key]);
  }
  return result;
}

// function defaultFn() {}
// export function getEventCreator<TReducers extends DeepDictionaryItem<ReducerFnAny>>(type?: string): EventCreatorOrMap<TReducers> {
//   return new Proxy(defaultFn, {
//     get(target, prop) {
//       const ns = [type, prop].filter(Boolean).join('.');
//       return getEventCreator<TReducers>(ns);
//     },
//     apply(target, thisArg, payload) {
//       return {
//         type,
//         payload,
//       };
//     },
//   }) as EventCreatorOrMap<TReducers>;
// }


export type EventTypes<TReducerFnOrMap extends DeepDictionaryItem<ReducerFnAny>, MaxDepth extends number = 5, NameAcc extends string = '', CurrentDepth extends number = 0> =
  CurrentDepth extends MaxDepth ? never :
  TReducerFnOrMap extends ReducerFnAny ? StandardEvent<InferPayload<TReducerFnOrMap>, NameAcc> :
  TReducerFnOrMap extends DeepDictionary<ReducerFnAny> ? {
    [K in keyof TReducerFnOrMap]: EventTypes<TReducerFnOrMap[K], MaxDepth, NameAcc extends '' ? K : `${NameAcc}.${Cast<K, string>}`, Inc<CurrentDepth>>;
  }[keyof TReducerFnOrMap] :
  never;
