import { Tex } from '../_interfaces';
import { Expression } from '../expression';

export type Solution = ReadonlyMap<string | symbol, number>;

export class Equation implements Tex {
  constructor(
    readonly lhs: Expression,
    readonly rhs: Expression,
  ) {}

  test(solution: Solution) {
    return this.lhs.substitute(solution).equals(this.rhs.substitute(solution))
  }

  toTexString() {
    return this.lhs.toTexString() + '=' + this.rhs.toTexString();
  }
}
