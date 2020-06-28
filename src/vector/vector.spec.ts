import { Vector } from ".";

describe("proof", () => {
  test('commutative', () => {
    const a = new Vector(1, 0, 0);
    const b = new Vector(1, 1, 0);
    expect(a.add(b)).toEq(b.add(a));
  });

  test('associative', () => {
    const a = new Vector(1, 0, 0);
    const b = new Vector(1, 1, 0);
    const c = new Vector(0, 0, 1);
    expect(a.add(b).add(c)).toEq(b.add(c).add(a));
  });

  test("A, B != 0 ==> ∃ s, t; p = sA + sB", () => {
    const a = new Vector(1, 0, 0);
    const b = new Vector(1, 1, 0);
    const p = new Vector(4, 2, 0);
    expect(p).toEq(a.multiply(2).add(b.multiply(2)));
  });

  test("A⊥B <=> A.B = 0", () => {
    const a = new Vector(1, 0, 0);
    const b = new Vector(0, 1, 0);
    expect(a.dotProd(b)).toBe(0);
  });

  test("A.B = 0 <=> A⊥B", () => {
    const a = new Vector(1, 0, 0);
    const b = new Vector(0, 1, 0);
    expect(a.getAngle(b)).toBe(Math.PI / 2);
  });

  test("A.A = |A|^2", () => {
    const a = new Vector(2, 0, 0);
    expect(a.dotProd(a)).toBe(a.norm ** 2);
  });

  test("|A| = √A.A", () => {
    const a = new Vector(2, 0, 0);
    expect(a.norm).toBe(Math.sqrt(a.dotProd(a)));
  });
});
