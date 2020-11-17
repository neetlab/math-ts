import { immerable } from "immer";
import { Tex } from "../_interfaces";
import { Expression, Item } from "../expression";

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

  moveToRight(item: Item) {
    if (!this.lhs.has(item)) {
      throw new Error(`LHS has no item named ${item.toTexString()}`);
    }

    return new Identity(
      this.lhs.remove(item),
      this.rhs.add(new Expression([item.product(-1)])),
    );
  }

  moveToLeft(item: Item) {
    if (!this.rhs.has(item)) {
      throw new Error(`LHS has no item named ${item.toTexString()}`);
    }

    return new Identity(
      this.rhs.remove(item),
      this.lhs.add(new Expression([item.product(-1)])),
    );
  }

  toTexString() {
    return `${this.lhs.toTexString()}=${this.rhs.toTexString()}`;
  }
}
