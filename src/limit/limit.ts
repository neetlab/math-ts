import { Function1 } from "src/function/function1";
import { range } from "../integer";
import { ArithmeticSequence, GeometricSequence, Sequence } from "../sequence";

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

export function lim(arrow: number, arithmetic: ArithmeticSequence): number;
export function lim(arrow: number, geometric: GeometricSequence): number;
export function lim(arrow: number, func: Function1): number;
export function lim(arrow: number, value: unknown): number {
  const seq  = value;
  const func = value;

  // 無限等比数列
  if (seq instanceof GeometricSequence && seq.length === Number.POSITIVE_INFINITY) {
    if (seq.ratio > 1)           return Number.POSITIVE_INFINITY;
    if (seq.ratio === 1)         return 1;
    if (Math.abs(seq.ratio) < 1) return 0;
    if (seq.ratio <= -1)         return NaN;
  }

  // 無限級数
  if (seq instanceof ArithmeticSequence && true /* sigma(arith) */) {
    // これは無理
    // 部分分数分解みたいな方法で証明している
    return NaN;
  }

  // 無限等比級数
  if (seq instanceof GeometricSequence && true /* Sigma(GeometricSequence) && seq.length == ∞ */) {
    if (Math.abs(seq.ratio) < 1)  return seq.first / (1 - seq.ratio);
    if (Math.abs(seq.ratio) >= 1) return NaN;
  }

  // lim{x->a}f(x)においてaがfの定義域 <=> lim{x->a}f(x) = f(a)
  // x --> ∞　でもこれでいいはず
  if (func instanceof Function1 && func.domain.test(arrow)) {
    // 連続性のチェックが必要？ p.142
    return func.call(arrow);
  }

  // 指数関数 / 対数関数


  return NaN;
}

export const getInfinityType = (arrow: number, sequence: Sequence) => {
  const limitSeq = pairwise(getCloser(arrow, sequence));

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


const getCloser = (arrow: number, sequence: Sequence) => {
  return pairwise(
    range(0, arrow)
      .map((i) => sequence.getNth(i)),
  ).map(([self, next]) => next - self);
}
