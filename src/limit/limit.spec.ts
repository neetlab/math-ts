import { Sequence } from "../sequence";
import { Limit, InfinityType } from "./limit";

class NSquare extends Sequence {
  getNth(n: number) {
    return n**2;
  }

  equals(that: Sequence) {
    return that instanceof NSquare;
  }
}

class SevenMinusTwoN extends Sequence {
  getNth(n: number) {
    return 7 - (2 * n);
  }

  equals(that: Sequence) {
    return that instanceof NSquare;
  }
}

class UnitFraction extends Sequence {
  getNth(n: number) {
    return 1 / (n + 1);
  }

  equals(that: Sequence) {
    return that instanceof UnitFraction;
  }
}

class Oscillate extends Sequence {
  getNth(n: number) {
    return (-1) ** n;
  }

  equals(that: Sequence) {
    return that instanceof Oscillate;
  }
}

describe('Limit', () => {
  test('diverge (positive)', () => {
    const lim = new Limit(new NSquare(), 10000);
    const type = lim.getInfinityType();
    expect(type).toBe(InfinityType.DIVERGE_POSITIVE);
  });
  
  test('diverge (negative)', () => {
    const lim = new Limit(new SevenMinusTwoN(), 10000);
    const type = lim.getInfinityType();
    expect(type).toBe(InfinityType.DIVERGE_NEGATIVE);
  });

  test('converge', () => {
    const lim = new Limit(new UnitFraction(), 10000);
    const type = lim.getInfinityType();
    expect(type).toBe(InfinityType.CONVERGE);
  });

  test('oscillate', () => {
    const lim = new Limit(new Oscillate(), 10000);
    const type = lim.getInfinityType();
    expect(type).toBe(InfinityType.OSCILLATE);
  });
});
