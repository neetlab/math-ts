import { Tex } from '../_interfaces';
import { Expression } from '../expression';

export type Solution = ReadonlyMap<string | symbol, number>;

export class Equation implements Tex {
  constructor(
    readonly lhs: Expression,
    readonly rhs: Expression,
  ) {}

  test(solution: Solution) {
    const rhs_ = [...solution.entries()]
      .reduce((expr, [name, value]) => expr.substitute(name, value), this.rhs)
      .evaluate();

    const lhs_ = [...solution.entries()]
      .reduce((expr, [name, value]) => expr.substitute(name, value), this.lhs)
      .evaluate();

    return rhs_.equals(lhs_);
  }

  toTexString() {
    return this.rhs.toTexString() + '=' + this.lhs.toTexString();
  }
}
