export abstract class Sequence {
  abstract readonly first: number;
  abstract readonly length: number;

  abstract getSum(n: number): number;
  abstract getNth(n: number): number;

  get last() {
    return this.getNth(this.length - 1);
  }

  toArray() {
    return Array.from({ length: this.length }, (_, i) => this.getNth(i));
  }

  toString() {
    return `{ ${this.toArray().join(', ')} }`;
  }

  [Symbol.iterator]() {
    const self = this;
    let i = 0;

    return {
      next() {
        const value = self.getNth(i);
        const done = i + 1 >= self.length;
        i++;
        return { value, done };
      },
      return(value: number) {
        return { value, done: true };
      },
      throw(error: Error) {
        throw error;
      },
    };
  }
}
