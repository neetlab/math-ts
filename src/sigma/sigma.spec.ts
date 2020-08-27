import { sigma } from "./sigma";
import { cnst, id } from "../_utils";
import { ArithmeticSequence } from "../sequence";

test("sum_{k=1}^{n}c = nc", () => {
  const n = 3;
  const c = 2;
  expect(sigma(1, n, cnst(c))).toBe(n * c);
});

test("sum_{k=1}^{n}1 = n", () => {
  const n = 3;
  expect(sigma(1, n, cnst(1))).toBe(n);
});

test("sum_{k=1}^{n}k = \frac{1}{2}n(n+1)", () => {
  const n = 3;
  expect(sigma(1, n, id)).toBe((1 / 2) * n * (n + 1));
});

test("sum_{k=1}^{n}k^2 = \frac{1}{6}n(n+1)(2n+1)", () => {
  const n = 3;
  expect(sigma(1, n, (k) => k ** 2)).toBe((1 / 6) * n * (n + 1) * (2 * n + 1));
});

test("sum_{k=1}^{n}k^3 = {\frac{1}{2}n(n+1)}^2", () => {
  const n = 3;
  expect(sigma(1, n, (k) => k ** 3)).toBe(((1 / 2) * n * (n + 1)) ** 2);
});

test("r != 1 => sum_{k=1}^{n}r^{k-1} = frac{{r^n}-1}{r-1}", () => {
  const n = 3;
  const r = 4;
  expect(sigma(1, n, (k) => r ** (k - 1))).toBe((r ** n - 1) / (r - 1));
});

test("sum_{k=1}^{n}(a_k + b_k) = sum_{k=1}^{n}a_k + sum_{k=1}^{n}b_k", () => {
  const a = new ArithmeticSequence(1, 2, 30);
  const b = new ArithmeticSequence(2, 3, 40);
  const n = 10;

  expect(sigma(1, n, (k) => a.getNth(k) + b.getNth(k))).toBe(
    sigma(1, n, (k) => a.getNth(k)) + sigma(1, n, (k) => b.getNth(k))
  );
});

test("sum_{k=1}^{n}pa_k = p\sum_{k=1}^{n}a_k", () => {
  const p = 123;
  const a = new ArithmeticSequence(1, 2, 30);
  const n = 10;

  expect(sigma(1, n, k => p * a.getNth(k))).toBe(p * sigma(1, n, k => a.getNth(k)));
});
