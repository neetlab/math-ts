import { immerable } from "immer";
import { Expression } from "../expression";
import { Tex, Eq } from "../_interfaces";

export type Values = ReadonlyMap<string | symbol, number>;

export class Function implements Tex, Eq<Function> {
  readonly [immerable] = true;

  constructor (
    private readonly expression: Expression
  ) {}

  call(values: Values) {
    return this.expression.substitute(values);
  }

  equals(that: Function) {
    return this.expression.equals(that.expression);
  }
  
  toTexString() {
    return `f(x)=${this.expression.toTexString()}`;
  }
}
