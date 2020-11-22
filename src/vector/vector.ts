import { Applicative1 } from 'fp-ts/lib/Applicative';
import { Eq } from 'fp-ts/lib/Eq';
import { Group } from 'fp-ts/lib/Group';
import { pipe } from 'fp-ts/lib/pipeable';
import { Ring } from 'fp-ts/lib/Ring';
import { complexReal, fieldReal } from 'src/number/real';
import { RealLike, Real } from '../number';

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

export const mulReal = <T, U>(R1: RealLike<T>, R2: RealLike<U>) => (a: Vector<T>, k: U) =>
  map(a, (x) => Real.mul(R1.getReal(x), R2.getReal(k)));

export const getNorm = <T>(R: RealLike<T>) => (v: Vector<T>) =>
  Real.real(Math.hypot(R.getReal(v.x).value, R.getReal(v.y).value, R.getReal(v.z).value));

export const getDotProd = <T, U>(R1: RealLike<T>, R2: RealLike<U>) => (a: Vector<T>, b: Vector<U>) => pipe(
  Real.mul(R1.getReal(a.x), R2.getReal(b.x)),
  (t) => Real.add(t, Real.mul(R1.getReal(a.y), R2.getReal(b.y))),
  (t) => Real.add(t, Real.mul(R1.getReal(a.z), R2.getReal(b.z))),
);

export const getAngle = <T, U>(R1: RealLike<T>, R2: RealLike<U>) => (a: Vector<T>, b: Vector<U>) =>
  Real.real(Math.acos(Real.div(getDotProd(R1, R2)(a, b), Real.mul(getNorm(R1)(a), getNorm(R2)(b))).value));

export const getRing = <T>(R: Ring<T>): Ring<Vector<T>> => ({
  zero: vector(R.zero, R.zero, R.zero),
  one: vector(R.one, R.one, R.one),
  add: (a, b) => vector(R.add(a.x, b.x), R.add(a.y, a.y), R.add(a.z, b.z)),
  sub: (a, b) => vector(R.sub(a.x, b.x), R.sub(a.y, a.y), R.sub(a.z, b.z)),
  mul: (a, b) => vector(
    R.sub(R.mul(a.y, b.z), R.mul(b.y, a.z)),
    R.sub(R.mul(a.z, b.x), R.mul(b.z, a.x)),
    R.sub(R.mul(a.x, b.y), R.mul(b.x, a.y)),
  ),
});

// 逆ベクトルを出す方法をベクトルの実数倍の計算しかしらないので
// 複素数とかに拡張されるとわからん。半環なら行ける？
export const groupVector: Group<Vector<Real.Real>> = {
  empty: getRing(fieldReal).zero,
  concat: getRing(fieldReal).add,
  inverse: (a) => mulReal(complexReal, complexReal)(a, Real.real(-1)),
};

export const getEq = <T>(E1: Eq<T>) => ({
  equals: (a: Vector<T>, b: Vector<T>) => E1.equals(a.x, b.x) && E1.equals(a.y, b.y) && E1.equals(a.z, b.z),
});

export const applicativeVector: Applicative1<URI> = {
  URI,
  of: <A>(a: A): Vector<A> => vector(a, a, a),
  map: <A, B>(fa: Vector<A>, f: (a: A) => B): Vector<B> => vector(f(fa.x), f(fa.y), f(fa.z)),
  ap: <A, B>(fab: Vector<(a: A) => B>, fa: Vector<A>): Vector<B> => vector(fab.x(fa.x), fab.y(fa.y), fab.z(fa.z)),
};

export const { of, map, ap } = applicativeVector;
