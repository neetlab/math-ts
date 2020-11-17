import { Constant } from "./constant"
import { Expression } from "./expression"
import { Variable } from "./variable";

describe('Expression', () => {
  test('1 + 1 = 2', () => {
    const expression = new Expression([
      new Constant(1),
      new Constant(1),
    ]);
    expect(expression.evaluate().toNumber()).toBe(2);
  });

  test('x = 1 ==> x + 1 = 2', () => {
    const expression = new Expression([
      new Variable('x', 1, 1),
      new Constant(1),
    ]);
    expect(expression.substitute('x', 1).evaluate().toNumber()).toBe(2);
  });
})
