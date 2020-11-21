import { pipe } from "fp-ts/lib/function";
import { Vector, add, equals, mulR } from ".";
import { getAngle, getDotProd, getNorm } from "./vector";

describe("proof", () => {
  test('commutative', () => {
    const a = Vector(1, 0, 0);
    const b = Vector(1, 1, 0);
    expect(equals(add(a, b), add(b, a))).toBe(true);
  });

  test('associative', () => {
    const a = Vector(1, 0, 0);
    const b = Vector(1, 1, 0);
    const c = Vector(0, 0, 1);
    const abc = pipe(
      add(a, b),
      (ab) => add(ab, c)
    );
    const bca = pipe(
      add(b, c),
      (bc) => add(bc, a)
    );

    expect(equals(abc, bca)).toBe(true);
  });

  test("A, B != 0 ==> ∃ s, t; p = sA + sB", () => {
    const a = Vector(1, 0, 0);
    const b = Vector(1, 1, 0);
    const r = pipe(
      a,
      (v) => add(v, b),
      (v) => mulR(v, 2),
      (v) => equals(v, Vector(4, 2, 0)),
    );
    expect(r).toBe(true);
  });

  test("A⊥B <=> A.B = 0", () => {
    const a = Vector(1, 0, 0);
    const b = Vector(0, 1, 0);
    expect(getDotProd(a, b)).toBe(0);
  });

  test("A.B = 0 <=> A⊥B", () => {
    const a = Vector(1, 0, 0);
    const b = Vector(0, 1, 0);
    expect(getAngle(a, b)).toBe(Math.PI / 2);
  });

  test("A.A = |A|^2", () => {
    const a = Vector(2, 0, 0);
    expect(getDotProd(a, a)).toBe(getNorm(a) ** 2);
  });

  test("|A| = √A.A", () => {
    const a = Vector(2, 0, 0);
    expect(getNorm(a)).toBe(Math.sqrt(getDotProd(a, a)));
  });
});
