import { immerable } from "immer";
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
  
  toTexString() {
    const variables = this.expression
      .getVariables()
      .map((variable) => variable.name)
      .reduce((unique, name) => unique.includes(name) ? unique : unique.concat(name), [] as (string | symbol)[])
      .join(', ');

    return `f(${variables})=${this.expression.toTexString()}`;
  }
}
