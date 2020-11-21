import { Complex } from "./complex";
import { Integer } from "./integer";
import { Natural } from "./natural";
import { Rational } from "./rational";
import { Real } from "./real";

interface InexhaustibleReadonlySet<T> {
  readonly size: number;
  has(v: T): boolean;
}

export const N: InexhaustibleReadonlySet<Natural> = {
  size: Number.POSITIVE_INFINITY,
  has: (v) => v._tag === 'Natural',
  // toTexString: () => '\\mathbb{N}',
}

export const Z: InexhaustibleReadonlySet<Natural | Integer> = {
  size: Number.POSITIVE_INFINITY,
  has: (v) => ['Natural', 'Integer'].includes(v._tag),
  // toTexString: () => '\\mathbb{Z}',
}

export const Q: InexhaustibleReadonlySet<Natural | Integer | Rational> = {
  size: Number.POSITIVE_INFINITY,
  has: (v) => ['Natural', 'Integer', 'Rational'].includes(v._tag),
  // toTexString: () => '\\mathbb{Q}',
}

export const R: InexhaustibleReadonlySet<Natural | Integer | Rational | Real> = {
  size: Number.POSITIVE_INFINITY,
  has: (v) => ['Natural', 'Integer', 'Rational', 'Real'].includes(v._tag),
  //  toTexString: () => '\\mathbb{R}';
}

export const C: InexhaustibleReadonlySet<Natural | Integer | Rational | Real | Complex> = {
  size: Number.POSITIVE_INFINITY,
  has: (v) => ['Natural', 'Integer', 'Rational', 'Real', 'Complex'].includes(v._tag),
  //  toTexString: () => '\\mathbb{R}';
}

