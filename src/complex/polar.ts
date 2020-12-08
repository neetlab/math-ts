import { Complex } from './complex';


export class Polar {
  constructor(
    readonly radius: number,
    readonly arg: number,
  ) {}

  get re() {
    return this.radius * Math.cos(this.arg);
  }

  get im() {
    return this.radius * Math.sin(this.arg);
  }

  mul(that: Polar) {
    return new Polar(this.radius * that.radius, this.arg + that.arg);
  }

  div(that: Polar) {
    return new Polar(this.radius / that.radius, this.arg - that.arg);
  }

  rotate(theta: number) {
    const t = new Polar(1, theta);
    return this.mul(t);
  }

  toComplex() {
    return new Complex(this.re, this.im);
  }

  toCartesian() {
    return [this.re, this.im] as const;
  }
}
