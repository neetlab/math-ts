import { Field } from "fp-ts/lib/Field";
import { Eq } from "fp-ts/lib/Eq";
import * as R from './real';
import { complex } from "./complex";
import { real, Real } from "./real";
import { identity } from "fp-ts/lib/function";
import { ImaginaryLike } from "./class";

export const URI = 'math-ts/lib/Imaginary';
export type  URI = typeof URI;

export interface Imaginary {
  readonly _tag: 'Imaginary',
  readonly factor: Real;
}

export const imaginary = (factor: Real): Imaginary => ({
  _tag: 'Imaginary',
  factor,
});

export const eqImaginary: Eq<Imaginary> = {
  equals: (a: Imaginary, b: Imaginary) => a.factor === b.factor,
};

export const fieldImaginary: Field<Imaginary> = {
  degree: () => 1,
  zero: imaginary(real(0)),
  one: imaginary(real(1)),
  add: (a: Imaginary, b: Imaginary) => imaginary(R.add(a.factor, b.factor)),
  sub: (a: Imaginary, b: Imaginary) => imaginary(R.sub(a.factor, b.factor)),
  mul: (a: Imaginary, b: Imaginary) => imaginary(R.mul(a.factor, b.factor)),
  div: (a: Imaginary, b: Imaginary) => imaginary(R.div(a.factor, b.factor)),
  mod: (a: Imaginary, b: Imaginary) => imaginary(R.mod(a.factor, b.factor)),
};


export const complexImaginary: ImaginaryLike<Imaginary> = {
  getImaginary: identity,
  getComplex: (i: Imaginary) => complex(real(0), i),
};

export const { equals } = eqImaginary;
export const { degree, zero, one, add, sub, mul, div, mod } = fieldImaginary;
export const { getImaginary, getComplex } = complexImaginary;
