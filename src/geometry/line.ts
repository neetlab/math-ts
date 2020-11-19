import { Constant, Expression, Variable } from "../expression";
import { Equation } from "../equation";
import { Point } from "./point";

export class Line {
  constructor(
    readonly equation: Equation,
  ) {}

  static fromPointAndSlope(point: Point, m: number) {
    return new Line(new Equation(
      new Expression([
        new Variable('y'),
        new Constant(point.y * -1),
      ]),
      new Expression([
        new Variable('x'),
        new Constant(point.x * -1),
      ]).multiply(m),
    ));
  }

  static fromX(x: number) {
    return new Line(new Equation(
      new Expression([new Variable('x')]),
      new Expression([new Constant(x)]),
    ));
  }

  static fromPoints(p1: Point, p2: Point) {
    return this.fromPointAndSlope(p1, (p2.y - p1.y) / (p2.x - p1.x));
  }

  getDistance(point: Point) {
    const a = this.equation.lhs.getVariable('x')?.factor;
    const b = this.equation.lhs.getVariable('y')?.factor;
    const vars = new Map([['x', point.x], ['y', point.y]]);
    if (a == null || b == null) throw new Error();

    return (
      Math.abs(this.equation.lhs.substitute(vars).toNumber())
      / //------------ 
      Math.hypot(a, b)
    );
  }

  isRightAngle(that: Line) {
    const m1 = this.equation.lhs.getVariable('x')?.factor;
    const m2 = that.equation.lhs.getVariable('x')?.factor;
    return m1 && m2 && m1 * m2 === -1;
  }

  isParallelTo(that: Line) {
    const m1 = this.equation.lhs.getVariable('x')?.factor;
    const m2 = that.equation.lhs.getVariable('x')?.factor;
    return m1 && m2 && m1 === m2;
  }
}
