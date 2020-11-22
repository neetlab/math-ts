import { Ord } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";
import { Group } from "fp-ts/lib/Group";
import { identity } from "fp-ts/lib/function";
import { Ring } from "fp-ts/lib/Ring";
import { Newtype, iso, prism } from 'newtype-ts';

import { complex } from "./complex";
import { rational } from "./rational";
import * as R from "./real";
import { IntegerLike } from "./class";

export type Integer = Newtype<{ readonly integer: unique symbol }, number>;

export const integer = iso<Integer>();
const isInteger = (n: number) => Number.isInteger(n);
export const from = prism<Integer>(isInteger);

// 可換環
export const ringInteger: Ring<Integer> = {
  zero: integer.from(0),
  one: integer.from(1),
  add: (a, b) => integer.from(integer.to(a) + integer.to(b)),
  sub: (a, b) => integer.from(integer.to(a) - integer.to(b)),
  mul: (a, b) => integer.from(integer.to(a) * integer.to(b)),
}

export const { zero, one, add, sub, mul } = ringInteger;

// 加算の群
export const groupInteger: Group<Integer> = {
  empty: zero,
  concat: add,
  inverse: (a) => mul(a, integer.from(-1)),
}

export const { empty, concat, inverse } = groupInteger;

// 半順序
export const ordInteger: Ord<Integer> = { 
  equals: (a, b) => integer.to(a) === integer.to(b),
  compare: (a, b): Ordering => integer.to(a) - integer.to(b) === 0 ? 0 : integer.to(a) > integer.to(b) ? 1 : -1,
};

export const { equals, compare } = ordInteger;

export const rationalInteger: IntegerLike<Integer> = {
  getInteger: identity,
  getRational: (i) => rational(getReal(i), getReal(one)),
  getReal: (i) => R.real(integer.unwrap(i)),
  getComplex: (i) => complex(getReal(i), R.zero),
}

export const { getInteger, getRational, getReal, getComplex } = rationalInteger;
