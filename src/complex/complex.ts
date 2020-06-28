import { Eq, Sum, Prod } from "../_interfaces";

export class Complex implements Eq<Complex>, Sum<Complex>, Prod<Complex> {
  constructor(readonly real: number, readonly imagine: number) {}

  equals(that: Complex) {
    return this.real === that.real && this.imagine === that.imagine;
  }

  add(that: Complex) {
    return new Complex(this.real + that.real, this.imagine + that.imagine);
  }

  multiply(that: Complex) {
    if (this.imagine === that.imagine) {
      return new Complex(this.real * that.real * -1, 0);
    }

    return new Complex(
      this.real * that.real - this.imagine * that.imagine,
      this.real * that.imagine + this.imagine * that.real
    );
  }

  toString() {
    return `${this.real} + ${this.imagine}i`;
  }
}
