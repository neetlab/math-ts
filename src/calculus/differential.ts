import { Constant, Expression, Variable } from '../expression';
import { Function } from '../function';

export const differentiate = (f: Function) => {
  const expr = new Expression(f.expression.terms.map((t) => {
    // (c)' = 0
    if (t instanceof Constant) return new Constant(0);
    // (x^n)' = nx^(x-1)
    return new Variable(t.name, t.exponent, Math.max(0, t.exponent - 1)).product(t.factor);
  }));

  return new Function(expr);
}
