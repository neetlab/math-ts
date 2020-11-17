import { Eq, Tex } from "../_interfaces";

export abstract class Sequence implements Iterable<number>, Tex, Eq<Sequence> {
  abstract readonly first: number;
  abstract readonly length: number;

  abstract getNth(n: number): number;
  abstract equals(that: Sequence): boolean;

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
