import { complex, Complex } from "./complex";
import { imaginary } from "./imaginary";
import * as R from './real';
import * as I from './integer';
import { integer, Integer } from "./integer";
import { lcm, gcd, Field } from 'fp-ts/lib/Field';
import { constant, identity } from "fp-ts/lib/function";
import { Ord } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";
import { RationalLike } from "./class";

export const URI = 'math-ts/lib/rational';
export type  URI = typeof URI;

export interface Rational {
  readonly _tag: 'Rational';
  readonly numerator: Integer;
  readonly denominator: Integer;
}

export const rational = (numerator: Integer, denominator: Integer): Rational => ({
  _tag: 'Rational',
  numerator,
  denominator,
});

const inverse = (a: Rational) => rational(a.denominator, a.numerator);

const reduceCommon = (a: Rational, b: Rational) => {
  const gcdI = lcm(I.ordInteger, I.fieldInteger)(a.denominator, b.denominator);
  const ma = I.div(a.denominator, gcdI);
  const mb = I.div(b.denominator, gcdI);

  return [
    rational(I.mul(a.numerator, ma), gcdI),
    rational(I.mul(b.numerator, mb), gcdI),
  ];
}

const reduceMul = (a: Rational) => {
  const gcdI = gcd(I.ordInteger, I.fieldInteger)(a.numerator, a.denominator);
  return rational(I.div(a.numerator, gcdI), I.div(a.denominator, gcdI));
}

export const fieldRational: Field<Rational> = {
  degree: () => 1,
  zero: rational(I.zero, I.zero),
  one: rational(I.one, I.one),

  add: (a_: Rational, b_: Rational) => {
    const [a, b] = reduceCommon(a_, b_);
    return rational(I.add(a.numerator, b.numerator), a.denominator);
  },

  mul: (a: Rational, b: Rational) => {
    const n = I.mul(a.numerator, b.numerator);
    const d = I.mul(a.numerator, b.numerator);
    return reduceMul(rational(n, d));
  },

  sub: (a: Rational, b: Rational) => add(a, mul(b, rational(integer(-1), integer(1)))),
  div: (a: Rational, b: Rational) => mul(a, inverse(b)),
  mod: constant(rational(I.zero, I.zero)),
};

export const realRational: RationalLike<Rational> = {
  getRational: identity,
  getReal: (r: Rational): R.Real => R.div(I.getReal(r.numerator), I.getReal(r.denominator)),
  getComplex: (r: Rational): Complex => complex(getReal(r), imaginary(R.zero)),
}

export const ordRational: Ord<Rational> = {
  equals: (a: Rational, b: Rational) => a.numerator === b.numerator && a.denominator === b.denominator,
  compare: (a_: Rational, b_: Rational): Ordering => {
    const [a, b] = reduceCommon(a_, b_);
    return a.numerator === b.numerator ? 0 : a.numerator > b.numerator ? 1 : -1;
  }
};

export const { equals, compare } = ordRational;
export const { degree, zero, one, add, mul, sub, div, mod } = fieldRational;
export const { getRational, getReal, getComplex } = realRational;
