import { Equation } from './equation';
import { Variable, Constant } from './item';

// 2x + 1 = 5
// 2x + 3y + 2 = 4

describe('Equation', () => {
  it('returns true if the solution is correct', () => {
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

  it('works with quadratic equation',() => {
    const equation = new Equation(
      [
        new Variable(Symbol.for('x'), 3, 2),
        new Variable(Symbol.for('y'), 5),
        new Constant(1),
      ],
    );

    const posSolution = (-5 + Math.sqrt(13)) / 6
    const negSolution = (-5 - Math.sqrt(13)) / 6

    expect(equation.test(new Map([[Symbol.for('x'), posSolution]]))).toBe(true);
    expect(equation.test(new Map([[Symbol.for('x'), negSolution]]))).toBe(true);
  });
})
