import { Expression, Constant, Variable } from "../expression"
import { Identity } from "./identity"

describe('Identity', () => {
  test('identity', () => {
    const c1 = new Constant(1);
    const c2 = new Constant(5);
    const v1 = new Variable('x', 1, 3);

    const id = Identity
      .create()
      .push(new Expression([c1, c2, v1]))
      .moveToRight(v1);

    const int = Math.floor(Math.random() * 10);
    const values = new Map([['x', int]]);

    expect(id.rhs.substitute(values).toNumber()).toBe(id.lhs.substitute(values).toNumber());
  })
})
