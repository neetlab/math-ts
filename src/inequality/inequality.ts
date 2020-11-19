import { immerable } from "immer";
import { Expression } from "src/expression";

export enum InequalityType {
  GT  = 'GT',
  GTE = 'GTE',
  LT  = 'LT',
  LTE = 'LTE',
};

type Solution = ReadonlyMap<string | symbol, number>;

export class Inequality {
  readonly [immerable] = true;

  constructor(
    readonly type: InequalityType,
    readonly lhs: Expression,
    readonly rhs: Expression,
  ) {}

  test(solution: Solution) {
    const lhs = this.lhs.substitute(solution).toNumber();
    const rhs = this.rhs.substitute(solution).toNumber();
    return this.compare(lhs, rhs);
  }

  private compare(a: number, b: number) {
    return ({
      [InequalityType.GT]:  a > b,
      [InequalityType.GTE]: a >= b,
      [InequalityType.LT]:  a < b,
      [InequalityType.LTE]: a <= b,
    })[this.type]
  }
}
