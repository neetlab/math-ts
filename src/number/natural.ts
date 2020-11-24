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

// constructors
export type Natural = Newtype<{ readonly natural: unique symbol }, number>;
export const isNatural = (n: number) => Number.isInteger(n) && n >= 0;
export const natural = iso<Natural>();
export const prismNatural = prism<Natural>(isNatural);

// |z| = n
export const abs = (z: Z.Integer) =>
  natural.from(Math.abs(Z.integer.to(z)));

// 階乗
export const factorial = (n: Natural): Natural => {
  return equals(n, zero) ? one : mul(n, natural.modify((a) => a - 1)(n));
}

// 四則演算
export const zero = natural.from(0);
export const one  = natural.from(1);

export const add = (a: Natural, b: Natural) =>
  natural.from(natural.to(a) + natural.to(b));

export const mul = (a: Natural, b: Natural) =>
  natural.from(natural.to(a) * natural.to(b));

export const sub = (a: Natural, b: Natural) =>
  natural.from(Math.max(0, natural.to(a) - natural.to(b)));

export const div = (a: Natural, b: Natural) =>
  natural.from(Math.max(0, Math.round(natural.to(a) / natural.to(b))));

export const mod = (a: Natural, b: Natural) =>
  natural.from(natural.to(a) % natural.to(b));


// 減算が負になるので半環
export const semiringNatural: Semiring<Natural> = { zero, one, add, mul };

// 半順序
export const ordNatural: Ord<Natural> = { 
  equals: (a, b) => natural.to(a) === natural.to(b),
  compare: (a, b) => natural.to(a) - natural.to(b) === 0 ? 0 : natural.to(a) > natural.to(b) ? 1 : -1,
}

export const { equals, compare } = ordNatural;

// Z, Q, R, C にキャスト
export const integerNatural: NaturalLike<Natural> = {
  getNatural: identity,
  getInteger: (n) => Z.integer.wrap(natural.unwrap(n)),
  getRational: (n) => rational(getReal(n), R.one),
  getReal: (n) => real(natural.unwrap(n)),
  getComplex: (n) => complex(getReal(n), R.zero),
}

export const { getNatural, getInteger, getRational, getReal, getComplex } = integerNatural;
