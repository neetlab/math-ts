import { where } from "../_utils";
import { Constant, Expression, Term, Variable } from "../expression";
import { Function } from "../function";

export const CONSTANT_OF_INTEGRATION = new Variable('C');

const indefiniteIntegrate = (f: Function, x: string | symbol) => {
  const expr = new Expression(
    f.expression.terms
      .map((t): Term => {
        if (t instanceof Constant && t.evaluate() > 0) {
          return new Variable(x, 1, 1).product(t.evaluate());
        }

        if (t instanceof Variable) {
          return new Variable(t.name, 1 / (t.exponent + 1), t.exponent + 1).product(t.factor);
        }

        return t;
      })
      .concat(CONSTANT_OF_INTEGRATION),
  );

  return new Function(expr);
}

const definiteIntegrate = (f: Function, a: number, b: number, x: string | symbol) => {
  return f.call(where(x, a).toMap()).toNumber() - f.call(where(x, b).toMap()).toNumber();
}

type DefiniteDSetter = { d: (x: string | symbol) => number };
type IndefiniteDSetter = { d: (x: string | symbol) => Function };

export function integrate(f: Function, a: number, b: number): DefiniteDSetter;
export function integrate(f: Function, a?: undefined, b?: undefined): IndefiniteDSetter;
export function integrate(f: Function, a: any, b: any): any {
  return {
    d: (x: string | symbol) => {
      if (a && b) return definiteIntegrate(f, a, b, x);
      return indefiniteIntegrate(f, x);
    }
  }
}
