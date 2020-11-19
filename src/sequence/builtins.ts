import { nCr } from "../probability";
import { sigma } from "../sigma";
import { Sequence } from "./sequence";

class FibonacciSequence extends Sequence {
  readonly length = Number.POSITIVE_INFINITY;

  equals(that: Sequence) {
    return that instanceof FibonacciSequence;
  }

  getNth(n: number): number {
    if (n === 0) return 1;
    if (n === 1) return 1;
    return this.getNth(n - 1) + this.getNth(n - 2);
  }
}

class TribonacciSequence extends Sequence {
  readonly length = Number.POSITIVE_INFINITY;

  equals(that: Sequence) {
    return that instanceof FibonacciSequence;
  }

  getNth(n: number): number {
    if (n === 0) return 1;
    if (n === 1) return 1;
    if (n === 2) return 1;
    return this.getNth(n - 1) + this.getNth(n - 2) + this.getNth(n - 3);
  }
}

class TetranacciSequence extends Sequence {
  readonly length = Number.POSITIVE_INFINITY;

  equals(that: Sequence) {
    return that instanceof FibonacciSequence;
  }

  getNth(n: number): number {
    if (n === 0) return 1;
    if (n === 1) return 1;
    if (n === 2) return 1;
    if (n === 3) return 1;
    return this.getNth(n - 1) + this.getNth(n - 2) + this.getNth(n - 3) + this.getNth(n - 4)
  }
}

class BernoulliSequence extends Sequence {
  readonly length = Number.POSITIVE_INFINITY;

  equals(that: Sequence) {
    return that instanceof BernoulliSequence;
  }

  getNth(n: number): number {
    if (n === 0) return 1;
    return -1/(n+1) * sigma(0, n-1, k => nCr(n+1, k) * this.getNth(k));
  }
}

export const fibonacci = new FibonacciSequence();
export const tribonacci = new TribonacciSequence();
export const tetranacci = new TetranacciSequence();
export const bernoulli = new BernoulliSequence();
