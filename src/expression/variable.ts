import { immerable } from 'immer';
import { Eq, Tex } from '../_interfaces';
import { Constant } from './constant';
import { Item } from './expression';

export class Variable implements Tex, Eq<Item> {
  readonly [immerable] = true;

  constructor(
    readonly name: symbol | string,
    readonly factor: number,
    readonly exponent: number,
  ) {}

  substitute(value: number) {
    return new Constant(this.factor * value ** this.exponent);
  }

  product(k: number) {
    return new Variable(this.name, this.factor * k, this.exponent);
  }

  equals(that: Item) {
    return that instanceof Variable
      && this.name === that.name
      && this.factor === that.factor
      && this.exponent === that.exponent;
  }

  toTexString() {
    let str = '';
    if (this.factor < 0) str += this.factor
    if (this.factor === 0) return str;
    if (this.factor > 1) str += this.factor
    str += this.name.toString();
    if (this.exponent !== 1) str += `^${this.exponent}`;
    return str;
  }
}

