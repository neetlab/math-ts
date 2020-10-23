export interface Item<T extends symbol> {
  name: T;
  evaluate(value: number): number;
}

export class Variable<T extends symbol> implements Item<T> {
  constructor(
    readonly name: T,
    readonly factor: number = 1,
    readonly exponent: number = 1
  ) {}

  evaluate(value: number) {
    return this.factor * value ** this.exponent;
  }
}

export const CONSTANT = Symbol();

export class Constant implements Item<symbol> {
  readonly name = CONSTANT;

  constructor (
    readonly value: number,
  ) {}

  evaluate() {
    return this.value;
  }
}
