import { Tex } from '../_interfaces';
import { Expression } from '../expression';

export type Solution = ReadonlyMap<string | symbol, number>;

export class Equation implements Tex {
  constructor(
    readonly lhs: Expression,
    readonly rhs: Expression,
  ) {}

  test(solution: Solution) {
    const lhs_ = [...solution.entries()]
      .reduce((expr, [name, value]) => expr.substitute(name, value), this.lhs)
      .evaluate();

    const rhs_ = [...solution.entries()]
      .reduce((expr, [name, value]) => expr.substitute(name, value), this.rhs)
      .evaluate();

    return lhs_.equals(rhs_);
  }

  toTexString() {
    return this.lhs.toTexString() + '=' + this.rhs.toTexString();
  }
}
