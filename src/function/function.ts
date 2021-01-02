import { immerable } from "immer";
import { differentiate } from "../calculus";
import { Expression } from "../expression";
import { Tex, Eq } from "../_interfaces";

type Values = ReadonlyMap<string | symbol, number>;

export class Function implements Tex, Eq<Function> {
  readonly [immerable] = true;

  constructor (
    readonly expression: Expression,
  ) {}

  call(values: Values) {
    return this.expression.substitute(values);
  }

  partial(values: Values) {
    return new Function(this.expression.substitute(values));
  }

  equals(that: Function) {
    return this.expression.equals(that.expression);
  }

  getTangent(x: number) {
    const deltaX = differentiate(this).d('x').call(new Map([])).toNumber();
    return (x1: number, y1: number) => deltaX*(x - x1) + y1;
  }
  
  toTexString() {
    const variables = this.expression
      .getVariables()
      .map((variable) => variable.name)
      .reduce((unique, name) => unique.includes(name) ? unique : unique.concat(name), [] as (string | symbol)[])
      .join(', ');

    return `f(${variables})=${this.expression.toTexString()}`;
  }
}
