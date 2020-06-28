import { permutation, factorial } from '../permutation';

export const combination = (n: number, r: number) => {
  return permutation(n, r) / factorial(r);
}
