import { immerable } from "immer";
import { Tex } from "../_interfaces";
import { Expression, Term } from "../expression";

export class Identity implements Tex {
  readonly [immerable] = true;

  private constructor(
    readonly lhs = new Expression(),
    readonly rhs = new Expression(),
  ) {}

  static create() {
    return new Identity();
  }

  push(identity: Expression) {
    return new Identity(
      this.lhs.add(identity),
      this.rhs.add(identity),
    );
  }

  moveToRight(term: Term) {
    if (!this.lhs.has(term)) {
      throw new Error(`LHS has no term named ${term.toTexString()}`);
    }

    return new Identity(
      this.lhs.remove(term),
      this.rhs.add(new Expression([term.product(-1)])),
    );
  }

  moveToLeft(term: Term) {
    if (!this.rhs.has(term)) {
      throw new Error(`LHS has no term named ${term.toTexString()}`);
    }

    return new Identity(
      this.rhs.remove(term),
      this.lhs.add(new Expression([term.product(-1)])),
    );
  }

  divide() {
    throw 'unimplemented';
  }

  toTexString() {
    return `${this.lhs.toTexString()}=${this.rhs.toTexString()}`;
  }
}
