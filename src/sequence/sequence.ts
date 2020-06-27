export abstract class Sequence {
  abstract length: number;
  abstract getNth(n: number): number;

  get last() {
    return this.getNth(this.length - 1);
  }

  toArray() {
    return Array.from({ length: this.length }, (_, i) => this.getNth(i));
  }

  [Symbol.iterator]() {
    let i = 0;

    return {
      next() {
        const value = this.getNth(i);
        const done = i + 1 >= this.length;
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
