import { Item } from "./item";
import { Constant } from './constant';

export class Variable implements Item {
  constructor(
    readonly name: symbol | string,
    readonly factor: number,
    readonly exponent: number,
  ) {}

  substitute(value: number) {
    return new Constant(this.factor * value ** this.exponent);
  }

  isNegativeFactor() {
    return this.factor < 0;
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

