import {
  ArithmeticSequence as ASeq,
  GeometricSequence as GSeq,
  DifferenceSequence as DSeq,
} from ".";
import { sigma } from "./sigma";

describe("sequence proof", () => {
  test("a_1 = S_1", () => {
    const a = new ASeq(1, 2, 10);
    expect(a.getSum(0, 0)).toBe(a.getNth(0));
  });

  test("a_n = S_n - S_n-1 (n >= 2)", () => {
    const n = 2;
    const a = new ASeq(1, 2, 10);
    expect(a.getNth(2)).toBe(a.getSum(0, n) - a.getSum(0, n - 1));
  });

  test("{a} is an arithmetic seq <=> 2*a_2 = a_1 + a_3", () => {
    const a = new ASeq(1, 2, 10);
    expect(a.getNth(0) + a.getNth(2)).toBe(2 * a.getNth(1));
  });

  test("{a} is an geometric seq ∧ a_1, a_2, a_2 != 0 <=> a_2^2 = a_1 + a_3", () => {
    const a = new GSeq(1, 2, 10);
    expect(a.getNth(0) * a.getNth(2)).toBe(a.getNth(1) ** 2);
  });

  test("{b_n} is a difference seq of {a_n} ∧ n>=2 <=> a_n = a_1 + sum_{k=1}^{n-1}b_k", () => {
    const a = new GSeq(1, 2, 12);
    const b = new DSeq(a);
    const n = Math.floor(Math.random() * 10) + 2;

    expect(n).toBeGreaterThanOrEqual(2);
    expect(a.getNth(n)).toBe(a.first + sigma(0, n-1, (k) => b.getNth(k)));
  });
});
