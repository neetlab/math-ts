import { Bounded } from "fp-ts/lib/Bounded";
import { Field, gcd } from "fp-ts/lib/Field";
import { identity } from "fp-ts/lib/function";
import { Group } from "fp-ts/lib/Group";
import { Ordering } from "fp-ts/lib/Ordering";
import { RealLike } from "./class";
import { complex } from "./complex";

export interface Real {
  readonly _tag: 'Real',
  readonly value: number;
}

export const real = (value: number): Real => ({
  _tag: 'Real',
  value,
});

// 互いに素
export const isCoprime = (a: Real, b: Real) => equals(gcd(boundedReal, fieldReal)(a, b), one);

// 複素数へのキャスト
export const complexReal: RealLike<Real> = {
  getReal: identity,
  getComplex: (r) => complex(r, real(0)),
}

// 実数は実数に閉じてるので体
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

export const { degree, zero, one, add, sub, mul, div ,mod } = fieldReal;

// 加算で群
export const groupReal: Group<Real> = {
  empty: zero,
  concat: add,
  inverse: (a) => mul(a, real(-1)),
}

export const { empty, concat, inverse } = groupReal;

export const boundedReal: Bounded<Real> = {
  top: real(Infinity),
  bottom: real(-Infinity),
  equals: (a, b) => a.value === b.value,
  compare: (a, b): Ordering => a.value === b.value ? 0 : a.value > b.value ? 1 : -1,
}

export const { getReal, getComplex } = complexReal;
export const { equals, compare, top, bottom } = boundedReal;
