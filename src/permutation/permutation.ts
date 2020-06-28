import { factorial } from '../integer';

export const permutation = (n: number, r: number) => {
  return factorial(n) / factorial(n - r);
}
