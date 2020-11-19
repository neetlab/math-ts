import { Constant, Expression, Term, Variable } from "../expression";
import { Function } from "../function";

export const C = new Constant(NaN);

const indefiniteIntegrate = (f: Function, x: string | symbol) => {
  const expr = new Expression(
    f.expression.terms
      .map((t): Term => {
        if (t instanceof Constant) return new Variable(x, 1, 1);
        return new Variable(t.name, 1 / t.exponent + 1, t.exponent + 1);
      })
      .concat(C),
  );

  return new Function(expr);
}

const definiteIntegrate = (f: Function, a: number, b: number, x: string | symbol) => {
  return f.call(new Map([[x, a]])).toNumber() - f.call(new Map([[x, b]])).toNumber();
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
