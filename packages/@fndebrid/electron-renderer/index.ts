import 'react-hot-loader/patch';
import './hot';

declare global {
  interface Set<T> {
    filter(predicate: (item: T, index?: number, set?: Set<T>) => boolean): Set<T>;
    with(value: T): Set<T>;
    without(value: T): Set<T>;
  }
}
// Set.prototype.filter = function <T>(predicate: (item: T, index?: number, set?: Set<T>) => boolean): Set<T>{

// }
Set.prototype.with = function<T>(this: Set<T>, value: T) {
  if (this.has(value)) {
    return this;
  }
  return new Set([...this, value]);
};
Set.prototype.without = function<T>(this: Set<T>, value: T) {
  if (!this.has(value)) {
    return this;
  }
  return new Set([...this].filter(p => p !== value));
};
