import { Sequence } from "../sequence";

export const sigma = (k: number, n: number, expr: (n: number) => number) => {
  let i = k;
  let sum = 0;

  while (i <= n) {
    sum += expr(i);
    i++;
  }

  return sum;
}


export class Sigma {
  constructor(
    readonly from: number,
    readonly to: number,
    readonly seq: Sequence,
  ) {}

  evaluate() {
    let i = this.from;
    let sum = 0;

    while (i <= this.to) {
      sum += this.seq.getNth(i);
      i++;
    }

    return sum;
  }

  toString() {
    return `\\sum_k={${this.from}}^{${this.to}}${this.seq}`;
  }
}
