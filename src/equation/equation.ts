import { Tex } from '../_interfaces';
import { Expression } from '../expression';

type Solution = ReadonlyMap<string | symbol, number>;

export class Equation implements Tex {
  constructor(
    readonly lhs: Expression,
    readonly rhs: Expression,
  ) {}

  solve(solutionGenerator: () => number = Math.random): number[] {
    const x = solutionGenerator()

    while (true) {
      const isRight = this.lhs.substitute(new Map([['x', x]])).equals(
        this.rhs.substitute(new Map([['x', x]]))
      )

      if (isRight) return [x];
    }
  }

  test(solution: Solution) {
    return this.lhs.substitute(solution).equals(this.rhs.substitute(solution))
  }

  toTexString() {
    return this.lhs.toTexString() + '=' + this.rhs.toTexString();
  }
}
