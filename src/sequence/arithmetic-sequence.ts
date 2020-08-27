import { Sequence } from "./sequence";

export class ArithmeticSequence extends Sequence {
  constructor(
    readonly first: number,
    readonly diff: number,
    readonly length = Number.POSITIVE_INFINITY
  ) {
    super();
  }

  static from(array: number[]) {
    if (array.length < 2) return null;

    // prettier-ignore
    return new ArithmeticSequence(
      array[0],
      array[1] - array[0],
      array.length
    );
  }

  equals(that: ArithmeticSequence) {
    return (
      this.first === that.first &&
      this.diff === that.diff &&
      this.length === that.length
    );
  }

  getNth(n: number) {
    if (n + 1 > this.length) {
      throw new RangeError(
        `N value ${n} is greater than the length of the sequence ${this.length}`
      );
    }

    return this.first + this.diff * n;
  }

  getSum(since = 0, until = this.length - 1) {
    const first = this.getNth(since);
    const last = this.getNth(until);
    const length = until + 1;

    return ((first + last) * length) / 2;
  }
}
