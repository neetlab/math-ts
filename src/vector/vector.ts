import { Applicative1 } from 'fp-ts/lib/Applicative';
import { Eq } from 'fp-ts/lib/Eq';
import { Ring } from 'fp-ts/lib/Ring';

export const URI = 'math-ts/lib/Vector' as const;
export type  URI = typeof URI;

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Vector<A>;
  }
}

export interface Vector<T> {
  readonly _tag: 'Vector',
  readonly x: T;
  readonly y: T;
  readonly z: T;
}

export const vector = <T>(x: T, y: T, z: T): Vector<T> => ({
  _tag: 'Vector',
  x, y, z,
});

export const mulR = <T extends number>(v: Vector<T>, k: T) => map(v, (a): number => a * k);
export const getNorm = <T extends number>(v: Vector<T>) => Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
export const getDotProd = <T extends number>(a: Vector<T>, b: Vector<T>) => a.x ** b.x + a.y ** b.y + a.z ** b.z;
export const getAngle = <T extends number>(a: Vector<T>, b: Vector<T>) => Math.acos(getDotProd(a, b) / getNorm(a) * getNorm(b));

export const ringVector: Ring<Vector<number>> = {
  zero: vector(0, 0, 0),
  one: vector(1, 1, 1),
  add: <T extends number>(a: Vector<T>, b: Vector<T>) => vector(a.x + b.x, a.y + b.y, a.z + b.z),
  sub: <T extends number>(a: Vector<T>, b: Vector<T>) => vector(a.x + b.x, a.y + b.y, a.z + b.z),
  mul: <T extends number>(a: Vector<T>, b: Vector<T>) => vector(a.y * b.z - b.y * a.z, a.z * b.x - b.z * a.x, a.x * b.y - b.x * a.y),
};

export const eqVector: Eq<Vector<unknown>> = {
  equals: <T>(a: Vector<T>, b: Vector<T>) => a.x === b.x && a.y === b.y && a.z === b.z,
};

export const applicativeVector: Applicative1<URI> = {
  URI,
  of: <A>(a: A): Vector<A> => vector(a, a, a),
  map: <A, B>(fa: Vector<A>, f: (a: A) => B): Vector<B> => vector(f(fa.x), f(fa.y), f(fa.z)),
  ap: <A, B>(fab: Vector<(a: A) => B>, fa: Vector<A>): Vector<B> => vector(fab.x(fa.x), fab.y(fa.y), fab.z(fa.z)),
};

export const { equals } = eqVector;
export const { of, map, ap } = applicativeVector;
export const { zero, one, add, sub, mul } = ringVector;
