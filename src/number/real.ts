import { Field } from "fp-ts/lib/Field";
import { identity } from "fp-ts/lib/function";
import { Ord } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";
import { RealLike } from "./class";
import { complex } from "./complex";
import { imaginary } from "./imaginary";

export const URI = 'math-ts/lib/Real';
export type  URI = typeof URI;

export interface Real {
  readonly _tag: 'Real',
  readonly value: number;
}

export const real = (value: number): Real => ({
  _tag: 'Real',
  value,
});

export const complexReal: RealLike<Real> = {
  getReal: identity,
  getComplex: (r: Real) => complex(r, imaginary(real(0))),
}

export const fieldReal: Field<Real> = {
  degree: () => 1,
  zero: real(0),
  one: real(1),
  add: (a: Real, b: Real) => real(a.value + b.value),
  sub: (a: Real, b: Real) => real(a.value - b.value),
  mul: (a: Real, b: Real) => real(a.value * b.value),
  div: (a: Real, b: Real) => real(a.value / b.value),
  mod: (a: Real, b: Real) => real(a.value % b.value),
}

export const ordReal: Ord<Real> = {
  equals: (a: Real, b: Real) => a.value === b.value,
  compare: (a: Real, b: Real): Ordering => a.value === b.value ? 0 : a.value > b.value ? 1 : -1,
}

export const { getReal, getComplex } = complexReal;
export const { degree, zero, one, add, sub, mul, div ,mod } = fieldReal;
export const { equals, compare } = ordReal;
