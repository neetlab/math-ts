export interface Ord<T> {
  compare(that: T): number;
}
