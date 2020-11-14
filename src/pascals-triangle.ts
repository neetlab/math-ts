import { range } from "./integer";
import { Possibility } from "./probability";

export const pascalsTriangleStr = (a: number) => (b: number) => (n: number) => range(0, n+1)
  .map((r) => `{}_${n}C_{${r}}${a}^{${n-r}}${b}^${r}`)
  .join(' + ');

export const pascalsTriangle = (a: number) => (b: number) => (n: number) => range(0, n+1)
  .map((r) => Possibility.nCr(n, r) * a**(n-r) * b**r)
  .reduce((a, b) => a + b, 0);
