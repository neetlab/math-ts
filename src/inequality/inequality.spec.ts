import { where } from "../_utils";
import { Expression, Variable } from "../expression";
import { Inequality, InequalityType } from "./inequality";

test('2x > x', () => {
  const inequality = new Inequality(
    InequalityType.GT,
    new Expression([new Variable('x', 2, 1)]),
    new Expression([new Variable('x', 1, 1)]),
  );

  expect(inequality.test(where('x').is(1))).toBe(true);
  expect(inequality.test(where('x').is(-1))).toBe(false);
});
