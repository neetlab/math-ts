import { Eq, Tex } from "../_interfaces";

export abstract class Sequence implements Iterable<number>, Tex, Eq<Sequence> {
  abstract getNth(n: number): number;
  abstract equals(that: Sequence): boolean;

  readonly length: number = Number.POSITIVE_INFINITY;
  readonly first = this.getNth(0);

  get last() {
    return this.getNth(this.length - 1);
  }

  toArray() {
    return Array.from({ length: this.length }, (_, i) => this.getNth(i));
  }

  toTexString() {
    return `{ ${this.toArray().join(', ')} }`;
  }

  *[Symbol.iterator]() {
    let i = 0;

    while (i < this.length) {
      const value = this.getNth(i);
      yield value;
      i++;
    }
  }
}
