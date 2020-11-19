import { immerable } from 'immer';
import { Eq, Tex } from '../_interfaces';
import { Constant } from './constant';
import { Term } from './expression';

export class Variable implements Tex, Eq<Term> {
  readonly [immerable] = true;

  constructor(
    readonly name: symbol | string,
    readonly factor = 1,
    readonly exponent = 1,
  ) {}

  substitute(value: number) {
    return new Constant((this.factor * value) ** this.exponent);
  }

  product(k: number) {
    return new Variable(this.name, this.factor * k, this.exponent);
  }

  equals(that: Term) {
    return that instanceof Variable
      && this.name === that.name
      && this.factor === that.factor
      && this.exponent === that.exponent;
  }

  toTexString() {
    if (this.exponent === 0) return this.factor.toString(); // fixme
    let str = '';
    // factor
    if (this.factor !== 1) {
      if (this.factor < 0) str += this.factor
      if (this.factor > 0) str += this.factor
      if (this.factor === 0) return '0';
    }
    // body
    str += this.name.toString();
    // exponent
    if (this.exponent !== 1) str += `^${this.exponent}`;
    return str;
  }
}
