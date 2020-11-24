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

// constructor
export type Integer = Newtype<{ readonly integer: unique symbol }, number>;
export const isInteger = (n: number) => Number.isInteger(n);
export const integer = iso<Integer>();
export const prismInteger = prism<Integer>(isInteger);

// 四則演算
export const zero = integer.from(0);
export const one  = integer.from(1);

export const add = (a: Integer, b: Integer) =>
  integer.from(integer.to(a) + integer.to(b));

export const sub = (a: Integer, b: Integer) =>
  integer.from(integer.to(a) - integer.to(b));

export const mul = (a: Integer, b: Integer) =>
  integer.from(integer.to(a) * integer.to(b));

// a = bk + m <==> m = a - bk
export const mod = (a: Integer, b: Integer) =>
  integer.from(integer.to(a) % integer.to(b));

// C-style div
export const div = (a: Integer, b: Integer) =>
  integer.from(Math.round(integer.to(a) / integer.to(b)));

// 可換環
export const ringInteger: Ring<Integer> = { zero, one, add, sub, mul };

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

// Q, R, C へのキャスト
export const rationalInteger: IntegerLike<Integer> = {
  getInteger: identity,
  getRational: (i) => rational(getReal(i), getReal(one)),
  getReal: (i) => R.real(integer.unwrap(i)),
  getComplex: (i) => complex(getReal(i), R.zero),
}

export const { getInteger, getRational, getReal, getComplex } = rationalInteger;
