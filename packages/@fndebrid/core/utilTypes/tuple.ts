type LegitTuple = [] | [any] | [any, any] | [any, any, any] | [any, any, any, any] | [any, any, any, any, any] | [any, any, any, any, any, any] | [any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any];
export type Tuple<T extends any[]> =
  T extends LegitTuple & [] ? [] :
  T extends LegitTuple & [infer T0] ? [T0] :
  T extends LegitTuple & [infer T0, infer T1] ? [T0, T1] :
  T extends LegitTuple & [infer T0, infer T1, infer T2] ? [T0, T1, T2] :
  T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3] ? [T0, T1, T2, T3] :
  T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4] ? [T0, T1, T2, T3, T4] :
  T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5] ? [T0, T1, T2, T3, T4, T5] :
  T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6] ? [T0, T1, T2, T3, T4, T5, T6] :
  T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7] ? [T0, T1, T2, T3, T4, T5, T6, T7] :
  T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8] ? [T0, T1, T2, T3, T4, T5, T6, T7, T8] :
  T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9] ? [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9] :
  T extends LegitTuple ? T :
  never;


export function tuple<T extends LegitTuple>(items: T): Tuple<T>;
export function tuple<T extends LegitTuple>(...items: T): Tuple<T>;
export function tuple(...items: any[]) {
  if (items.length === 1) {
    if (Array.isArray(items[0])) {
      return tuple(...items[0] as any);
    }
  }
  if (items.length > 10) {
    throw new TypeError(
      "tuple util function only supports tuple length of up to 9"
    );
  }
  return items;
};
