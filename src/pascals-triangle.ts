
// (a+b)^n から b を取り出す r 個を選ぶ
// |=> C(n, r)

import { combination } from "./combination";

export const pascalsTriangleStr = (a: number) => (b: number) => (n: number) => Array
  .from({ length: n+1 }, (_, r) => `{}_${n}C_{${r}}${a}^{${n-r}}${b}^${r}`)
  .join(' + ');

export const pascalsTriangle = (a: number) => (b: number) => (n: number) => Array
  .from({ length: n+1 }, (_, r) => combination(n, r) * a**(n-r) * b**r)
  .reduce((a, b) => a + b, 0);
