import { Observable } from './observable';
import { Thunk } from './thunk';

export type AnyTypeOf<T, TYield> =
  | void
  | T
  | Thunk<AnyTypeOf<T, TYield>>
  | Observable<AnyTypeOf<T, TYield>>
  | PromiseLike<AnyTypeOf<T, TYield>>
  | Generator<AnyTypeOf<T, TYield>, AnyTypeOf<T, TYield>, TYield>
  | AsyncGenerator<AnyTypeOf<T, TYield>, AnyTypeOf<T, TYield>, TYield>
  | Iterable<AnyTypeOf<T, TYield>>
  | AsyncIterable<AnyTypeOf<T, TYield>>
  ;
