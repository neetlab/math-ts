import { eqNumber } from "fp-ts/lib/Eq";
import { fieldNumber } from "fp-ts/lib/Field";
import { Real, Integer } from '../number';
import { pipe } from "fp-ts/lib/function";
import { vector, mulReal, getEq } from ".";
import { getAngle, getDotProd, getNorm, getRing } from "./vector";

const  { integer: int } = Integer;
const { real } = Real;

describe("proof", () => {
  test('commutative', () => {
    const a = vector(1, 0, 0);
    const b = vector(1, 1, 0);
    const ring = getRing(fieldNumber);
    expect(getEq(eqNumber).equals(ring.add(a, b), ring.add(b, a))).toBe(true);
  });

  test('associative', () => {
    const a = vector(1, 0, 0);
    const b = vector(1, 1, 0);
    const c = vector(0, 0, 1);
    const ring = getRing(fieldNumber);

    const abc = pipe(
      ring.add(a, b),
      (ab) => ring.add(ab, c)
    );
    const bca = pipe(
      ring.add(b, c),
      (bc) => ring.add(bc, a)
    );

    expect(getEq(eqNumber).equals(abc, bca)).toBe(true);
  });

  test("A, B != 0 ==> ∃ s, t; p = sA + sB", () => {
    const a = vector(real(1), real(0), real(0));
    const b = vector(real(1), real(1), real(0));
    const ring = getRing(Real.fieldReal);

    const r = pipe(
      a,
      (v) => ring.add(v, b),
      (v) => mulReal(Real.complexReal, Real.complexReal)(v, real(2)),
      (v) => getEq(Real.boundedReal).equals(v, vector(real(4), real(2), real(0))),
    );
    expect(r).toBe(true);
  });

  test("A⊥B <=> A.B = 0", () => {
    const a = vector(int(1), int(0), int(0));
    const b = vector(int(0), int(1), int(0));
    const getDotProdI = getDotProd(Integer.rationalInteger, Integer.rationalInteger);
    expect(Real.equals(getDotProdI(a, b), real(0))).toBe(true)
  });

  test("A.B = 0 <=> A⊥B", () => {
    const a = vector(int(1), int(0), int(0));
    const b = vector(int(0), int(1), int(0));
    const getAngleI = getAngle(Integer.rationalInteger, Integer.rationalInteger);
    expect(getAngleI(a, b)).toBe(real(Math.PI / 2));
  });

  test("A.A = |A|^2", () => {
    const a = vector(int(2), int(0), int(0));
    const getNormI = getNorm(Integer.rationalInteger);
    const getDotProdI = getDotProd(Integer.rationalInteger, Integer.rationalInteger);
    expect(Real.equals(getDotProdI(a, a), real(getNormI(a).value ** 2)));
  });

  test("|A| = √A.A", () => {
    const a = vector(int(2), int(0), int(0));
    const getNormI = getNorm(Integer.rationalInteger);
    const getDotProdI = getDotProd(Integer.rationalInteger, Integer.rationalInteger);
    expect(Real.equals(getNormI(a), real(Math.sqrt(getDotProdI(a, a).value))));
  });
});
