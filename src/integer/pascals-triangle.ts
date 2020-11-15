import { range } from ".";
import { Probability } from "../probability";

export const pascalsTriangleStr = (a: number) => (b: number) => (n: number) => range(0, n)
  .map((r) => `\${}_${n}C_{${r}}${a}^{${n-r}}${b}^${r}\$`)
  .join(' + ');

export const pascalsTriangle = (a: number) => (b: number) => (n: number) => range(0, n)
  .map((r) => Probability.nCr(n, r) * a**(n-r) * b**r)
  .reduce((a, b) => a + b, 0);
