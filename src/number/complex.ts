import { Field } from "fp-ts/lib/Field";
import { Eq } from "fp-ts/lib/Eq";
import * as R from "./real";
import { Real } from './real';
import { identity } from "fp-ts/lib/function";
import { ComplexLike } from "./class";
import { Group } from "fp-ts/lib/Group";
import { some, none, Option } from "fp-ts/lib/Option";

export interface Complex {
  readonly _tag: 'Complex';
  readonly real: Real;
  readonly imaginary: Real;
}

export const complex = (real: Real, imaginary: Real): Complex => ({
  _tag: 'Complex',
  real,
  imaginary,
});

// 虚部がなければ実数に
export const toReal = (c: Complex): Option<Real> => R.equals(c.imaginary, R.zero) ? some(c.real) : none;

// 共軛な複素数
export const getConjugate = (a: Complex) => complex(
  a.real,
  R.mul(a.imaginary, R.real(-1)),
);

// 複素数は大小比較できない
const eqComplex: Eq<Complex> = {
  equals: (a, b) => R.equals(a.real, b.real) && R.equals(a.imaginary, b.imaginary),
};
export const { equals } = eqComplex;

// 体
const fieldComplex: Field<Complex> = {
  degree: () => 1,
  zero: complex(R.zero, R.zero),
  one:  complex(R.one, R.zero),
  add: (a, b) => complex(R.add(a.real, b.real), R.add(a.imaginary, b.imaginary)),
  sub: (a, b) => complex(R.sub(a.real, b.real), R.sub(a.imaginary, b.imaginary)),

  mul: (a, b) => complex(
    R.sub(R.mul(a.real, b.real), R.mul(a.imaginary, b.imaginary)),
    R.add(R.mul(a.real, b.imaginary), R.mul(b.real, a.imaginary)),
  ),

  div: (a, b) => complex(
    R.mul(a.real, R.inverse(b.real)),
    R.mul(a.imaginary, R.inverse(b.imaginary)),
  ),

  // わからん
  mod: () => complex(R.zero, R.zero),
}
export const { degree, zero, one, add, sub, mul, div, mod } = fieldComplex;

// 加算で群
export const groupComplex: Group<Complex> = {
  empty: zero,
  concat: add,
  inverse: (c) => complex(R.mul(c.real, R.real(-1)), R.mul(c.imaginary, R.real(-1))),
};
export const { empty, concat, inverse } = groupComplex;

const complexComplex: ComplexLike<Complex> = { getComplex: identity };
export const { getComplex } = complexComplex;


