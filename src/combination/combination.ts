import { permutation } from '../permutation';
import { factorial } from '../integer';

export const combination = (n: number, r: number) => {
  return permutation(n, r) / factorial(r);
}
