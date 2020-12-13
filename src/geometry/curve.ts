import { Cartesian as Point } from './coordinate';

export enum CurveType {
  PARABOLA  = 'PARABOLA',
  ELLIPSE   = 'ELLIPSE',
  HYPERBOLA = 'HYPERBOLA',
}

export class QuadraticCurve {
  constructor(
    // TODO: Cannot focus the point on the y axis :(
    readonly focus: Point,
    readonly eccentricity: number,
  ) {}

  get type() {
    return this.eccentricity === 1 ? CurveType.PARABOLA
         : this.eccentricity > 1   ? CurveType.HYPERBOLA
         : CurveType.ELLIPSE;
  }

  evaluate(x: number) {
    if (this.eccentricity === 1) return this.evaluateAsParabola(x);
    return this.evaluateAsHyperbolaOrEllipse(x);
  }

  private evaluateAsParabola(x: number) {
    return [
      Math.sqrt(4 * this.focus.x * x - this.focus.x ** 2),
      -1 * Math.sqrt(4 * this.focus.x * x - this.focus.x ** 2),
    ] as const;
  }

  // https://examist.jp/mathematics/quadratic-curve/risinritu/
  private evaluateAsHyperbolaOrEllipse(x: number) {
    const e = this.eccentricity;
    const c = this.focus.x;

    return [
      Math.sqrt(-1 * (1 - e ** 2) * ((x - c) / (1 - e ** 2)) - c ** 2),
      -1 * Math.sqrt(-1 * (1 - e ** 2) * ((x - c) / (1 - e ** 2)) - c ** 2),
    ] as const;
  }
}
