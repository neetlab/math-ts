import { Expression, Variable } from '../expression';
import { Function } from './function';

describe('Function', () => {
  test('function', () => {
    const f = new Function(new Expression([
      new Variable('x', 1, 1),
    ]));

    expect(f.call(new Map([['x', 5]])).toNumber()).toBe(5);
  })
})
