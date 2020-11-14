import { Equation } from './equation';
import { Variable, Constant } from './item';

// 2x + 1 = 5
// 2x + 3y + 2 = 4

describe('Equation', () => {
  it('2x - 3 = 0 ==> x = 1.5', () => {
    const equation = new Equation(
      [
        new Variable(Symbol.for('x'), 2),
        new Constant(-3)
      ],
    );

    expect(equation.test(new Map([
      [Symbol.for('x'), 1.5],
    ]))).toBe(true);

    expect(equation.test(new Map([
      [Symbol.for('x'), 100],
    ]))).toBe(false);
  });

  it('x^2 + x - 6 = 0 ==> x = 2, -3',() => {
    const equation = new Equation(
      [
        new Variable(Symbol.for('x'), 1, 2),
        new Variable(Symbol.for('x'), 1),
        new Constant(-6),
      ],
    );

    const posSolution = 2
    const negSolution = -3

    expect(equation.test(new Map([[Symbol.for('x'), posSolution]]))).toBe(true);
    expect(equation.test(new Map([[Symbol.for('x'), negSolution]]))).toBe(true);
  });
})
