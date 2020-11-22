import * as Z from './integer';
import * as R from './real';
import { Ord } from "fp-ts/lib/Ord";
import { rational } from './rational';
import { real } from './real';
import { complex } from './complex';
import { identity } from 'fp-ts/lib/function';
import { NaturalLike } from './class';
import { Semiring } from 'fp-ts/lib/Semiring';
import { Newtype, prism, iso } from 'newtype-ts';

export type Natural = Newtype<{ readonly natural: unique symbol }, number>;
const natural = iso<Natural>();

const isNatural = (n: number) => Number.isInteger(n) && n >= 0;
export const from = prism<Natural>(isNatural);

export const sub = (a: Natural, b: Natural) => Z.integer.from(natural.to(a) - natural.to(b))
export const fromInteger = (a: Z.Integer) => from.getOption(Z.integer.to(a));
export const factorial = (n: Natural): Natural => {
  const diff = fromInteger(sub(n, one));
  if (diff._tag === 'None') throw '';
  return equals(n, zero) ? one : mul(n, factorial(diff.value));
}

// 減算が負になるので半環
export const semiringNatural: Semiring<Natural> = {
  zero: natural.from(0),
  one: natural.from(1),
  add: (a, b) => natural.from(natural.to(a) + natural.to(b)),
  mul: (a, b) => natural.from(natural.to(a) * natural.to(b)),
}

export const { zero, one, add, mul } = semiringNatural;

export const ordNatural: Ord<Natural> = { 
  equals: (a, b) => natural.to(a) === natural.to(b),
  compare: (a, b) => natural.to(a) - natural.to(b) === 0 ? 0 : natural.to(a) > natural.to(b) ? 1 : -1,
}

export const { equals, compare } = ordNatural;

export const integerNatural: NaturalLike<Natural> = {
  getNatural: identity,
  getInteger: (n) => Z.integer.wrap(natural.unwrap(n)),
  getRational: (n) => rational(getReal(n), R.one),
  getReal: (n) => real(natural.unwrap(n)),
  getComplex: (n) => complex(getReal(n), R.zero),
}

export const { getNatural, getInteger, getRational, getReal, getComplex } = integerNatural;

