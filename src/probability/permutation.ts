import { factorial } from "../integer";

export const permute = <T>(
  xs: readonly T[],
  r: number,
  prefix: readonly T[] = [],
): readonly (readonly T[])[] => {
  if (xs.length < r) {
    throw new RangeError(`r value ${r} is greater than length ${xs.length}`);
  }

  if (r === 0) {
    if (prefix.length > 0) return [prefix];
    return [];
  }

  if (r === 1 && xs.length === 1) {
    return xs.map(x => prefix.concat(x));
  }

  if (r === 2 && xs.length === 2) {
    const [a, b] = xs;

    return [
      prefix.concat([a, b]),
      prefix.concat([b, a]),
    ];
  }

  return xs.flatMap((x) => permute(
    xs.filter((v) => v !== x),
    r - 1,
    prefix.concat(x),
  ));
}

export const nPr = (n: number, r: number) => {
  return factorial(n) / factorial(n - r);
}
