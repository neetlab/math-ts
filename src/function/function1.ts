import { Expression } from "../expression";

export class Interval {
  constructor(
    readonly from: number,
    readonly to: number,
  ) {}

  test(x: number) {
    return this.from <= x && x <= this.to;
  }
}

export class Function1 {
  constructor(
    private readonly expression: Expression,
    readonly domain: Interval,
    readonly range: Interval,
  ) {}

  call(value: number) {
    if (this.domain.test(value)) {
      throw RangeError(`Input value ${value} does not match the domain ${this.domain}`);
    }

    const result = this.expression
      .substitute(new Map([['x', value]]))
      .toNumber();

    if (this.range.test(result)) {
      throw Error('Range seem to be wrong');
    }

    return result;
  }

  inverse() {
    // TODO: 指数とか係数とか定数項を全部払って定義域と値域を逆にする
    return new Function1(this.expression, this.range, this.domain);
  }
}

export class IrrationalFunction1 {
  constructor(
    // inside root
    private readonly expression: Expression,
    readonly root: number,
    readonly operator: '+' | '-',
  ) {}

  call(value: number) {
    // within domain, the √ will never be negative
    const leaf = this.expression
      .substitute(new Map([['x', value]]))
      .toNumber();
    
    return (this.operator === '+' ? 1 : -1) * Math.pow(leaf, 1 / this.root);
  }
}

export class FractionFunction1 {
  constructor(
    readonly numerator: Expression,
    readonly denominator: Expression,
    readonly rest: Expression,
  ) {}

  call(value: number) {
    const x = new Map([['x', value]]);
    const n = this.numerator.substitute(x).toNumber();
    const d = this.numerator.substitute(x).toNumber();
    const r = this.rest.substitute(x).toNumber();

    // domain
    if (d === 0) throw RangeError('x is out of domain');

    return (n / d) + r;
  }
}
