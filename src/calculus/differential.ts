import { Constant, Expression, Variable } from '../expression';
import { Function } from '../function';

export const differentiate = (f: Function) => ({
  d: (x: string | symbol) => {
    const expr = new Expression(f.expression.terms.map((t) => {
      if (t instanceof Constant) return new Constant(0);
      if (t.name === x) return new Variable(t.name, t.exponent, Math.max(0, t.exponent - 1)).product(t.factor);
      return t;
    }));

    return new Function(expr);
  }
});
