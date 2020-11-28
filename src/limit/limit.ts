import { range } from "../integer";
import { Sequence } from "../sequence";

export enum InfinityType {
  DIVERGE_POSITIVE = 'DIVERGE_POSITIVE', // 正の無限大, 発散
  DIVERGE_NEGATIVE = 'DIVERGE_NEGATIVE', // 負の無限大, 発散
  CONVERGE         = 'CONVERGE',         // 収束
  OSCILLATE        = 'OSCILLATE',        // 振動
}

const pairwise = <T>(array: T[]) => {
  return array
    .map((self, i) => i !== 0 ? [array[i-1], self] : null)
    .filter((value): value is [T, T] => value != null);
}

export class Limit {
  constructor(
    private readonly sequence: Sequence,
    private readonly arrow: number,
  ) {}

  getInfinityType() {
    const limitSeq = pairwise(this.getCloser());

    // 正で限りなく大きくなる
    if (limitSeq.every(([self, next]) => self > 0 && self <= next)) {
      return InfinityType.DIVERGE_POSITIVE;
    }

    // 負で限りなく大きくなる
    if (limitSeq.every(([self, next]) => self < 0 && Math.abs(self) <= Math.abs(next))) {
      return InfinityType.DIVERGE_NEGATIVE;
    }

    // 一定の値に近づく
    // next - selfが負のときに > だとハンドルできないから絶対値を付ける...?
    if (limitSeq.every(([self, next]) => Math.abs(self) > Math.abs(next))) {
      return InfinityType.CONVERGE;
    }

    // 振動
    return InfinityType.OSCILLATE;
  }

  private getCloser() {
    return pairwise(
      range(0, this.arrow)
        .map((i) => this.sequence.getNth(i)),
    ).map(([self, next]) => next - self);
  }
}
