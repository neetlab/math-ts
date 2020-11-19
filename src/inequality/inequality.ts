import { immerable } from "immer";
import { Expression } from "src/expression";
import { Tex } from "../_interfaces";

export enum InequalityType {
  GT  = 'GT',
  GTE = 'GTE',
  LT  = 'LT',
  LTE = 'LTE',
};

type Solution = ReadonlyMap<string | symbol, number>;

export class Inequality implements Tex {
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

  toTexString() {
    const infix = ({
      [InequalityType.GT]:  '>',
      [InequalityType.GTE]: '\\geq',
      [InequalityType.LT]:  '<',
      [InequalityType.LTE]: '\\leq',
    })[this.type]

    return `${this.lhs.toTexString()}${infix}${this.rhs.toTexString()}`;
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
