import { Expression, Variable } from "../expression";

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
    private readonly domain: Interval,
    private readonly range: Interval,
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
