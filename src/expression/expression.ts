import { immerable } from 'immer';
import { Eq, Tex, Sum } from '../_interfaces';
import { Constant } from './constant';
import { Variable } from './variable';

export type Term = Variable | Constant;
type Values = ReadonlyMap<string | symbol, number>;

export class Expression implements Tex, Eq<Expression>, Sum<Expression> {
  readonly [immerable] = true;

  constructor(
    readonly terms: Term[] = [new Constant(0)],
  ) {}

  getVariables() {
    return this.terms.filter((term): term is Variable => term instanceof Variable);
  }

  getVariable(name: string | symbol) {
    return this.terms.find((term): term is Variable => term instanceof Variable && term.name === name);
  }

  getConstants() {
    return this.terms.filter((term): term is Constant => term instanceof Constant);
  }

  evaluate() {
    const constant = this.terms
      .filter((term): term is Constant => term instanceof Constant)
      .reduce((last, term) => {
        return last.add(term);
      }, new Constant(0));
    
    const variables = this.terms
      .filter((term): term is Variable => term instanceof Variable);

    return new Expression([...variables, constant]);
  }

  has(term: Term) {
    return this.terms.includes(term);
  }

  add(expr: Expression) {
    return new Expression([...this.terms, ...expr.terms ]).evaluate();
  }

  multiply(k: number) {
    return new Expression(this.terms.map((term) => {
      if (term instanceof Constant) return new Constant(term.evaluate() * k);
      return new Variable(term.name, term.factor * k, term.exponent);
    }));
  }

  substitute(values: Values) {
    return [...values.entries()]
      .reduce((expr, [name, value]) => expr.substituteOne(name, value), this as Expression)
      .evaluate();
  }

  remove(term: Term) {
    return new Expression(this.terms.filter((v) => !v.equals(term)));
  }

  equals(that: Expression) {
    return this.terms.every(a => that.terms.some(b => b.equals(a)));
  }

  toTexString() {
    return this.terms.map((term) => term.toTexString()).join('+');
  }

  toNumber() {
    return this.terms.reduce((last, term) => {
      if (term instanceof Variable) {
        throw new Error(`Expression has unassigned variable ${Variable.name}`);
      }

      return last + term.evaluate();
    }, 0);
  }

  private substituteOne(name: symbol | string, value: number) {
    return new Expression(
      this.terms.map((term) => {
        if (term instanceof Constant) return term;
        if (term.name !== name) return term;
        return term.substitute(value);
      }),
    );
  }
}
