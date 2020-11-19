import { Complex } from "../complex";

interface InexhaustibleReadonlySet<T> {
  readonly size: number;
  has(v: T): boolean;
}

export class N implements InexhaustibleReadonlySet<unknown> {
  size = Number.POSITIVE_INFINITY;

  has(v: unknown) {
    if (typeof v === 'number' && v % 1 === 0 && v >= 1) return true;
    return false;
  } 
}

export class Z implements InexhaustibleReadonlySet<unknown> {
  size = Number.POSITIVE_INFINITY;

  has(v: unknown) {
    if (typeof v === 'number' && Number.isInteger(v)) return true;
    return false;
  } 
}

// Q is not implementable

export class R implements InexhaustibleReadonlySet<unknown> {
  size = Number.POSITIVE_INFINITY;

  has(v: unknown) {
    if (typeof v === 'number') return true;
    return false;
  } 
}

export class C implements InexhaustibleReadonlySet<unknown> {
  size = Number.POSITIVE_INFINITY;

  has(v: unknown) {
    if (v instanceof Complex) return true;
    return false;
  } 
}
