import { complex, Complex } from "./complex";
import { imaginary } from "./imaginary";
import * as R from './real';
import { lcm, gcd, Field } from 'fp-ts/lib/Field';
import { constant, identity } from "fp-ts/lib/function";
import { Ord } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";
import { RationalLike } from "./class";

export interface Rational {
  readonly _tag: 'Rational';
  readonly numerator: R.Real;
  readonly denominator: R.Real;
}

// 整数な気がするけど整数の除算が整数に閉じないから困った
export const rational = (numerator: R.Real, denominator: R.Real): Rational => ({
  _tag: 'Rational',
  numerator,
  denominator,
});

const inverse = (a: Rational) => rational(a.denominator, a.numerator);

// 通分
const reduceCommonFactor = (a: Rational, b: Rational): [Rational, Rational] => {
  const gcdI = lcm(R.boundedReal, R.fieldReal)(a.denominator, b.denominator);
  const ma = R.div(a.denominator, gcdI);
  const mb = R.div(b.denominator, gcdI);

  return [
    rational(R.mul(a.numerator, ma), gcdI),
    rational(R.mul(b.numerator, mb), gcdI),
  ];
}

// 約分
const reduceMul = (a: Rational) => {
  const gcdI = gcd(R.boundedReal, R.fieldReal)(a.numerator, a.denominator);
  return rational(R.div(a.numerator, gcdI), R.div(a.denominator, gcdI));
}

export const fieldRational: Field<Rational> = {
  degree: () => 1,
  zero: rational(R.zero, R.zero),
  one: rational(R.one, R.one),

  add: (a_, b_) => {
    const [a, b] = reduceCommonFactor(a_, b_);
    return rational(R.add(a.numerator, b.numerator), a.denominator);
  },

  mul: (a, b) => {
    const n = R.mul(a.numerator, b.numerator);
    const d = R.mul(a.numerator, b.numerator);
    return reduceMul(rational(n, d));
  },

  sub: (a, b) => add(a, mul(b, rational(R.inverse(R.one), R.one))),
  div: (a, b) => mul(a, inverse(b)),
  mod: constant(rational(R.zero, R.zero)),
};

export const { degree, zero, one, add, mul, sub, div, mod } = fieldRational;

export const realRational: RationalLike<Rational> = {
  getRational: identity,
  getReal: (r): R.Real => R.div(R.getReal(r.numerator), R.getReal(r.denominator)),
  getComplex: (r): Complex => complex(getReal(r), imaginary(R.zero)),
}

export const { getRational, getReal, getComplex } = realRational;

export const ordRational: Ord<Rational> = {
  equals: (a, b) => a.numerator === b.numerator && a.denominator === b.denominator,
  compare: (a_, b_): Ordering => {
    const [a, b] = reduceCommonFactor(a_, b_);
    return a.numerator === b.numerator ? 0 : a.numerator > b.numerator ? 1 : -1;
  }
};

export const { equals, compare } = ordRational;
