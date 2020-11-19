import { Prod, Sum, Tex, Eq } from '../_interfaces';
import { Term } from './expression';

export const CONSTANT = Symbol();

export class Constant implements Tex, Sum<Constant>, Prod<Constant>, Eq<Constant> {
  readonly name = CONSTANT;

  constructor (
    private readonly value: number,
  ) {}

  add(that: Constant) {
    return new Constant(this.value + that.value);
  }

  multiply(that: Constant) {
    return new Constant(this.value * that.value);
  }

  product(k: number) {
    return new Constant(this.value * k);
  }

  evaluate() {
    return this.value;
  }

  equals(that: Term) {
    return that instanceof Constant
     && this.name === that.name
     && this.value === that.value;
  }

  toTexString() {
    return this.value.toString();
  }
}
