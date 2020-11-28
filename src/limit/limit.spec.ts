import { Sequence } from "../sequence";
import { Limit, InfinityType } from "./limit";

describe('Limit', () => {
  test('diverge (positive)', () => {
    const lim = new Limit(Sequence.from((n) => n**2), 10000);
    const type = lim.getInfinityType();
    expect(type).toBe(InfinityType.DIVERGE_POSITIVE);
  });
  
  test('diverge (negative)', () => {
    const lim = new Limit(Sequence.from((n) => 7 - (2 * n)), 10000);
    const type = lim.getInfinityType();
    expect(type).toBe(InfinityType.DIVERGE_NEGATIVE);
  });

  test('converge', () => {
    const lim = new Limit(Sequence.from((n) => 1 / (n + 1)), 10000);
    const type = lim.getInfinityType();
    expect(type).toBe(InfinityType.CONVERGE);
  });

  test('oscillate', () => {
    const lim = new Limit(Sequence.from((n) => (-1) ** n), 10000);
    const type = lim.getInfinityType();
    expect(type).toBe(InfinityType.OSCILLATE);
  });

  test('{a_n} {b_n} converges ∧ lim{n-->∞}=α <==> lim{n-->∞}ka_n=kα', () => {
    const lim = new Limit(Sequence.from((n) => 1 / (n + 1)), 10000);
    
  });
});
