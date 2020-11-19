import { Tex } from "../_interfaces";
import { Complex } from "../complex";

interface InexhaustibleReadonlySet<T> {
  readonly size: number;
  has(v: T): boolean;
}

class NaturalNumbers implements InexhaustibleReadonlySet<unknown> {
  size = Number.POSITIVE_INFINITY;

  has(v: unknown) {
    if (typeof v === 'number' && v % 1 === 0 && v >= 1) return true;
    return false;
  } 

  toTexString() {
    return '\\mathbb{N}';
  }
}

export const N = new NaturalNumbers();

class Integers implements InexhaustibleReadonlySet<unknown> {
  size = Number.POSITIVE_INFINITY;

  has(v: unknown) {
    if (typeof v === 'number' && Number.isInteger(v)) return true;
    return false;
  } 

  toTexString() {
    return '\\mathbb{Z}';
  }
}

export const Z = new Integers();

// Q is not implementable

class RealNumbers implements InexhaustibleReadonlySet<unknown>, Tex {
  size = Number.POSITIVE_INFINITY;

  has(v: unknown) {
    if (typeof v === 'number') return true;
    return false;
  } 

  toTexString() {
    return '\\mathbb{R}';
  }
}

export const R = new RealNumbers();

class ComplexNumbers implements InexhaustibleReadonlySet<unknown>, Tex {
  size = Number.POSITIVE_INFINITY;

  has(v: unknown) {
    if (v instanceof Complex || typeof v === 'number') return true;
    return false;
  } 

  toTexString() {
    return '\\mathbb{C}';
  }
}

export const C = new ComplexNumbers();
