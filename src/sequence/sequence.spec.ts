import { ArithmeticSequence as ASeq, GeometricSequence as GSeq } from ".";

describe('sequence proof', () => {
  test('a_1 = S_1', () => {
    const a = new ASeq(1, 2, 10);
    expect(a.getSum(1)).toBe(a.getNth(1));
  })

  test('a_n = S_n - S_n-1 (n >= 2)', () => {
    const n = 2;
    const a = new ASeq(1, 2, 10);
    expect(a.getNth(2)).toBe(a.getSum(n) - a.getSum(n - 1));
  })
});

describe("arithmetic seq proof", () => {
  test("2*a_2 = a_1 + a_3", () => {
    const a = new ASeq(1, 2, 10);
    expect(a.getNth(1) + a.getNth(3)).toBe(2 * a.getNth(2));
  });
});

describe('geometric seq proof', () => {
  test('a_2^2 = a_1 + a_3', () => {
    const a = new GSeq(1, 2, 10);
    expect(a.getNth(1) * a.getNth(3)).toBe(a.getNth(2) ^ 2);
  })
});
