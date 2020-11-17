import { Equation } from './equation';
import { Variable, Constant, Expression } from '../expression';

describe('Equation', () => {
  it('2x - 3 = 0 ==> x = 1.5', () => {
    const equation = new Equation(
      new Expression([
        new Variable('x', 2, 1),
        new Constant(-3)
      ]),
      new Expression([
        new Constant(0),
      ]),
    );

    expect(equation.test(new Map([
      ['x', 1.5],
    ]))).toBe(true);

    expect(equation.test(new Map([
      ['x', 100],
    ]))).toBe(false);
  });

  it('x^2 + x - 6 = 0 ==> x = 2, -3',() => {
    const equation = new Equation(
      new Expression([
        new Variable('x', 1, 2),
        new Variable('x', 1, 1),
        new Constant(-6),
      ]),
      new Expression([
        new Constant(0),
      ]),
    );

    const posSolution = 2
    const negSolution = -3

    expect(equation.test(new Map([['x', posSolution]]))).toBe(true);
    expect(equation.test(new Map([['x', negSolution]]))).toBe(true);
  });
})
