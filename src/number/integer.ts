import { complex } from "./complex";
import { rational } from "./rational";
import * as I from './imaginary';
import { real } from "./real";
import { Field, gcd } from "fp-ts/lib/Field";
import { Ord } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";
import { identity } from "fp-ts/lib/function";
import { Either, left, right } from "fp-ts/lib/Either";
import { IntegerLike } from "./class";

export const URI = 'math-ts/lib/integer';
export type  URI = typeof URI;

export interface Integer {
  readonly _tag: 'Integer',
  readonly value: number;
};

export const integer = (value: number): Integer => ({
  _tag: 'Integer',
  value,
});

export const fromPrimitive = (value: number): Either<string, Integer> => {
  if (value % 1 !== 0) left('Integer cannot have decimal');
  return right(integer(value));
}

export const isCoprime = (a: Integer, b: Integer) => gcd(ordInteger, fieldInteger)(a, b);

export const fieldInteger: Field<Integer> = {
  degree: () => 1,
  zero: integer(0),
  one: integer(1),
  add: (a, b) => integer(a.value + b.value),
  sub: (a, b) => integer(a.value - b.value),
  mul: (a, b) => integer(a.value * b.value),
  div: (a, b) => integer(a.value / b.value),
  mod: (a, b) => integer(a.value % b.value),
}

export const rationalInteger: IntegerLike<Integer> = {
  getInteger: identity,
  getRational: (i) => rational(i, one),
  getReal: (i) => real(i.value),
  getComplex: (i) => complex(getReal(i), I.zero),
}

export const ordInteger: Ord<Integer> = { 
  equals: (a, b) => a.value === b.value,
  compare: (a, b): Ordering => a.value - b.value === 0 ? 0 : a.value > b.value ? 1 : -1,
};

export const { equals, compare } = ordInteger;
export const { degree, zero, one, add, sub, mul, div, mod } = fieldInteger;
export const { getInteger, getRational, getReal, getComplex } = rationalInteger;
