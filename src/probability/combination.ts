import { Set as s } from "../set";
import { factorial } from "../integer";
import { permute, nPr } from "./permutation";

export const combine = <T>(
  xs: ReadonlySet<T>,
  r: number,
): readonly ReadonlySet<T>[] => {
  return permute([...xs.values()], r)
    .map((perm) => new Set(perm))
    .reduce((res, perm) => {
      if (res.some(u => s.equals(u, perm))) return res;
      return res.concat(perm);
    }, [] as ReadonlySet<T>[]);
}


export const nCr = (n: number, r: number) => {
  return nPr(n, r) / factorial(r);
}
