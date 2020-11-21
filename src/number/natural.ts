import * as I from './integer';
import * as Im from './imaginary';
import { Field } from "fp-ts/lib/Field";
import { Ord } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";
import { rational } from './rational';
import { real } from './real';
import { complex } from './complex';
import { identity } from 'fp-ts/lib/function';
import { Either, left, right } from 'fp-ts/lib/Either';
import { NaturalLike } from './class';

export const URI = 'math-ts/lib/natural';
export type  URI = typeof URI;

export interface Natural {
  readonly _tag: 'Natural',
  readonly value: number;
};

export const natural = (value: number): Natural => ({
  _tag: 'Natural',
  value,
});

export const fromPrimitive = (value: number): Either<string, Natural> => {
  if (value % 1 !== 0 && value <= 0) left('Natural number cannot have decimal and must be greater than or equal to 1');
  return right(natural(value));
}

export const factorial = (n: Natural): Natural => {
  return equals(n, zero) ? one : mul(n, factorial(sub(n, one)));
}

export const fieldNatural: Field<Natural> = {
  degree: () => 1,
  zero: natural(0),
  one: natural(1),
  add: (a, b) => natural(a.value + b.value),
  sub: (a, b) => natural(a.value - b.value),
  mul: (a, b) => natural(a.value * b.value),
  div: (a, b) => natural(a.value / b.value),
  mod: (a, b) => natural(a.value % b.value),
}

export const ordNatural: Ord<Natural> = { 
  equals: (a, b) => a.value === b.value,
  compare: (a, b): Ordering => a.value - b.value === 0 ? 0 : a.value > b.value ? 1 : -1,
}

export const integerNatural: NaturalLike<Natural> = {
  getNatural: identity,
  getInteger: (n) => I.integer(n.value),
  getRational: (n) => rational(getInteger(n), I.one),
  getReal: (n) => real(n.value),
  getComplex: (n) => complex(getReal(n), Im.zero),
}

export const { getNatural, getInteger, getRational, getReal, getComplex } = integerNatural;
export const { zero, one, add, sub, mul, div, mod, degree } = fieldNatural;
export const { equals, compare } = ordNatural;

