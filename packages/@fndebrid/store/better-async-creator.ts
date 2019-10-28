import {
  TypeConstant,
  AsyncActionBuilder,
  // ActionBuilderMap,
} from 'typesafe-actions';
import {createStandardAction, ActionCreator, TypeMeta} from 'typesafe-actions';
import {ActionBuilderConstructor} from 'typesafe-actions/dist/type-helpers';

export type AsyncActionCreator<
  TRequest extends [T1, P1],
  TSuccess extends [T2, P2],
  TFailure extends [T3, P3] = never,
  TCancel extends [T4, P4] = never,
  T1 extends TypeConstant = TRequest[0],
  P1 = TRequest[1],
  T2 extends TypeConstant = TSuccess[0],
  P2 = TSuccess[1],
  T3 extends TypeConstant = TFailure[0],
  P3 = TFailure[1],
  T4 extends TypeConstant = TCancel[0],
  P4 = TCancel[1]
> = {
  request: ActionBuilderConstructor<T1, P1>;
  success: ActionBuilderConstructor<T2, P2>;
  failure: TFailure extends [TypeConstant, any] ? ActionBuilderConstructor<T3, P3> : never;
  cancel: TCancel extends [TypeConstant, any] ? ActionBuilderConstructor<T4, P4> : never;
};
declare module 'typesafe-actions' {
  export interface AsyncActionBuilder<
    TType1 extends TypeConstant,
    TType2 extends TypeConstant,
    TType3 extends TypeConstant,
    TType4 extends TypeConstant
  > {
    <TPayload1, TPayload2>(): AsyncActionCreator<[TType1, TPayload1], [TType2, TPayload2]>;
  }
}
/**
 * implementation
 */
export function createBetterAsyncAction<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant
>(
  requestType: TType1,
  successType: TType2,
  failureType?: TType3,
  cancelType?: TType4,
): AsyncActionBuilder<TType1, TType2, TType3, TType4> {
  [requestType, successType].forEach(checkInvalidActionTypeInArray);

  const constructor = (<TPayload1, TPayload2, TPayload3, TPayload4>() => {
    return {
      request: createStandardAction(requestType)<TPayload1>(),
      success: createStandardAction(successType)<TPayload2>(),
      failure: failureType && createStandardAction(failureType)<TPayload3>(),
      cancel: cancelType && createStandardAction(cancelType)<TPayload4>(),
    };
  }) as AsyncActionBuilder<TType1, TType2, TType3, TType4>;

  const api = Object.assign<AsyncActionBuilder<TType1, TType2, TType3, TType4>, {}>(constructor, {
    // extension point for chain api
  });

  return api;
}

function checkInvalidActionTypeInArray(arg: TypeConstant, idx: number): void | never {
  if (arg == null) {
    throw new Error(`Argument contains array with empty element at index ${idx}`);
  } else if (typeof arg !== 'string' && typeof arg !== 'symbol') {
    throw new Error(
      `Argument contains array with invalid element at index ${idx}, it should be of type: string | symbol`,
    );
  }
}
