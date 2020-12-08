import { Eq, Sum, Prod, Tex } from "../_interfaces";

export class Complex implements Eq<Complex>, Sum<Complex>, Prod<Complex>, Tex {
  constructor(readonly real: number, readonly imagine: number) {}

  static from(x: number) {
    return new Complex(x, 0);
  }

  equals(that: Complex) {
    return this.real === that.real && this.imagine === that.imagine;
  }

  add(that: Complex) {
    return new Complex(this.real + that.real, this.imagine + that.imagine);
  }

  sub(that: Complex) {
    return new Complex(this.real - that.real, this.imagine - that.imagine);
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

  getConjugate() {
    return new Complex(this.real, this.imagine * -1);
  }

  abs() {
    return Math.sqrt(this.real ** 2 + this.imagine ** 2);
  }

  distance(that: Complex) {
    return this.sub(that).abs();
  }

  toRealNumber() {
    if (this.imagine !== 0) {
      throw new Error(`${this.toString()} is not a real number`)
    };

    return this.real;
  }

  toTexString() {
    return `\$${this.real} + ${this.imagine}i\$`;
  }
}
