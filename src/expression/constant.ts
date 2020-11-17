import { Prod, Sum, Tex, Eq } from '../_interfaces';
import { Item } from './expression';

export const CONSTANT = Symbol();

export class Constant implements Tex, Sum<Constant>, Prod<Constant>, Eq<Constant> {
  readonly name = CONSTANT;

  constructor (
    private readonly value: number,
  ) {}

  add(that: Constant) {
    return new Constant(this.evaluate() + that.evaluate());
  }

  multiply(that: Constant) {
    return new Constant(this.evaluate() * that.evaluate());
  }

  evaluate() {
    return this.value;
  }

  isNegativeFactor() {
    return this.value < 0;
  }

  equals(that: Item) {
    return that instanceof Constant
     && this.name === that.name
     && this.value === that.value;
  }

  toTexString() {
    return this.value.toString();
  }
}
