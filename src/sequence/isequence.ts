export interface ISequence {
  first: number;
  last: number;
  length: number;
  getNth(n: number): number;
  getSum(n: number): number;
  toArray(): number[];
  [Symbol.iterator](): Iterator<number>;
}
