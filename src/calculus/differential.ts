import { Constant, Expression, Variable } from '../expression';
import { Function } from '../function';

export const differentiate = (f: Function) => ({
  d: (x: string | symbol) => {
    const expr = new Expression(f.expression.terms.map((t) => {
      if (t instanceof Constant) return new Constant(0);
      const exponent = Math.max(0, t.exponent - 1);
      if (t.name === x && exponent <= 0) return new Constant(t.factor);
      if (t.name === x)  {
        return new Variable(t.name, t.exponent, exponent).product(t.factor);
      }
      return t;
    }));

    return new Function(expr);
  }
});
