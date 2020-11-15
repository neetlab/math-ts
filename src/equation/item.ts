import { Show } from "../_interfaces";

export interface Item extends Show {
  name: symbol | string;
}

export const CONSTANT = Symbol();

export class Constant implements Item {
  readonly name = CONSTANT;

  constructor (
    readonly value: number,
  ) {}

  evaluate() {
    return this.value;
  }

  toString() {
    return `\$${this.value}\$`;
  }
}

export class Variable implements Item {
  constructor(
    readonly name: symbol | string,
    readonly factor: number,
    readonly exponent: number,
  ) {}

  substitute(value: number) {
    return new Constant(this.factor * value ** this.exponent);
  }

  toString() {
    let str = '$';
    if (this.factor > 1) str += this.factor
    str += this.name.toString();
    if (this.exponent !== 1) str += `^${this.exponent}`;
    str += '$';
    return str;
  }
}

