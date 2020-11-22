import { Complex } from './complex';
import { Integer } from './integer';
import { Real } from './real';
import { Natural } from './natural';
import { Rational } from './rational';

export interface ComplexLike<T> {
  readonly getComplex: (a: T) => Complex;
}

export interface RealLike<T> extends ComplexLike<T> {
  readonly getReal: (a: T) => Real;
}

export interface RationalLike<T> extends RealLike<T> {
  readonly getRational: (a: T) => Rational;
}

export interface IntegerLike<T> extends RationalLike<T> {
  readonly getInteger: (a: T) => Integer;
}

export interface NaturalLike<T> extends IntegerLike<T> {
  readonly getNatural: (a: T) => Natural;
}

