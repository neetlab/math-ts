import { Sequence } from "./sequence";

export class GeometricSequence extends Sequence {
  constructor(
    readonly first: number,
    readonly ratio: number,
    readonly length: number = Number.POSITIVE_INFINITY
  ) {
    super();
  }

  static from(array: number[]) {
    if (array.length < 2) return null;

    // prettier-ignore
    return new GeometricSequence(
      array[0],
      array[1] / array[0],
      array.length
    );
  }

  equals(that: GeometricSequence) {
    return (
      this.first === that.first &&
      this.ratio === that.ratio &&
      this.length === that.length
    );
  }

  getNth(n: number) {
    if (n + 1 > this.length) {
      throw new RangeError(
        `N value ${n} is greater than the length of the sequence ${this.length}`
      );
    }

    return this.first * this.ratio ** n;
  }

  getSum(limit = this.length) {
    if (limit === 1) {
      return limit * this.first;
    }

    return (
      (this.first * (this.ratio ** limit - 1)) /
      //-------------------------------
      (this.ratio - 1)
    );
  }
}
