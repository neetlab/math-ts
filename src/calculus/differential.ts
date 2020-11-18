import { Constant, Expression, Variable } from '../expression';
import { Function } from '../function';

export const differentiate = (f: Function) => {
  const expr = new Expression(f.expression.items.map((t) => {
    // (c)' = 0
    if (t instanceof Constant) return new Constant(0);
    // (x^n)' = nx^(x-1)
    return new Variable(t.name, t.exponent, t.factor - 1);
  }));

  return new Function(expr);
}
