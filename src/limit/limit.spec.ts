import { Sequence } from "../sequence";
import { getInfinityType, InfinityType } from "./limit";

describe('Limit', () => {
  test('diverge (positive)', () => {
    const type = getInfinityType(Sequence.from((n) => n**2));
    expect(type).toBe(InfinityType.DIVERGE_POSITIVE);
  });
  
  test('diverge (negative)', () => {
    const type = getInfinityType(Sequence.from((n) => 7 - (2 * n)));
    expect(type).toBe(InfinityType.DIVERGE_NEGATIVE);
  });

  test('converge', () => {
    const type = getInfinityType(Sequence.from((n) => 1 / (n + 1)));
    expect(type).toBe(InfinityType.CONVERGE);
  });

  test('oscillate', () => {
    const type = getInfinityType(Sequence.from((n) => (-1) ** n));
    expect(type).toBe(InfinityType.OSCILLATE);
  });

  test('{a_n} {b_n} converges ∧ lim{n-->∞}=α <==> lim{n-->∞}ka_n=kα', () => {
    const type = getInfinityType(Sequence.from((n) => 1 / (n + 1)));
    expect(type).toBe(InfinityType.CONVERGE);
  });
});
