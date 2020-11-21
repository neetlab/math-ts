import { Field } from "fp-ts/lib/Field";
import { Eq } from "fp-ts/lib/Eq";
import * as I from "./imaginary";
import { imaginary, Imaginary } from './imaginary';
import * as R from "./real";
import { Real } from './real';
import { identity } from "fp-ts/lib/function";
import { ComplexLike } from "./class";

export const URI = 'math-ts/lib/SubComplex';
export type  URI = typeof URI;

export interface Complex {
  readonly _tag: 'Complex';
  readonly real: Real;
  readonly imaginary: Imaginary;
}

export const complex = (real: Real, imaginary: Imaginary): Complex => ({
  _tag: 'Complex',
  real,
  imaginary,
});

export const fromPrimitive = (a: number) => complex(R.real(a), I.zero);

export const getConjugate = (a: Complex) => complex(
  a.real,
  I.mul(a.imaginary, imaginary(R.real(-1)))
);

const eqComplex: Eq<Complex> = {
  equals: (a: Complex, b: Complex): boolean => R.equals(a.real, b.real) && I.equals(a.imaginary, b.imaginary),
};

const fieldComplex: Field<Complex> = {
  degree: () => 1,
  zero: complex(R.zero, imaginary(R.zero)),
  one:  complex(R.one, imaginary(R.zero)),
  add: (a: Complex, b: Complex): Complex => complex(R.add(a.real, b.real), I.add(a.imaginary, b.imaginary)),
  sub: (a: Complex, b: Complex): Complex => complex(R.sub(a.real, b.real), I.sub(a.imaginary, b.imaginary)),
  mul: (a: Complex, b: Complex): Complex => complex(R.mul(a.real, b.real), I.mul(a.imaginary, b.imaginary)),
  div: (a: Complex, b: Complex): Complex => complex(R.div(a.real, b.real), I.div(a.imaginary, b.imaginary)),
  mod: (a: Complex, b: Complex): Complex => complex(R.mod(a.real, b.real), I.mod(a.imaginary, b.imaginary)),
}

const complexLikeComplex: ComplexLike<Complex> = { getComplex: identity };

export const { equals } = eqComplex;
export const { degree, zero, one, add, sub, mul, div, mod } = fieldComplex;
export const { getComplex } = complexLikeComplex;


