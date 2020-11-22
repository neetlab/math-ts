import { Bounded } from "fp-ts/lib/Bounded";
import { Field } from "fp-ts/lib/Field";
import { identity } from "fp-ts/lib/function";
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
  getComplex: (r) => complex(r, imaginary(real(0))),
}

export const fieldReal: Field<Real> = {
  degree: () => 1,
  zero: real(0),
  one: real(1),
  add: (a, b) => real(a.value + b.value),
  sub: (a, b) => real(a.value - b.value),
  mul: (a, b) => real(a.value * b.value),
  div: (a, b) => real(a.value / b.value),
  mod: (a, b) => real(a.value % b.value),
}

export const boundedReal: Bounded<Real> = {
  top: real(Infinity),
  bottom: real(-Infinity),
  equals: (a, b) => a.value === b.value,
  compare: (a, b): Ordering => a.value === b.value ? 0 : a.value > b.value ? 1 : -1,
}

export const { getReal, getComplex } = complexReal;
export const { degree, zero, one, add, sub, mul, div ,mod } = fieldReal;
export const { equals, compare, top, bottom } = boundedReal;
