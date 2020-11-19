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
    return this.terms.filter((item): item is Variable => item instanceof Variable);
  }

  getConstants() {
    return this.terms.filter((item): item is Constant => item instanceof Constant);
  }

  evaluate() {
    const constant = this.terms
      .filter((item): item is Constant => item instanceof Constant)
      .reduce((last, item) => {
        return last.add(item);
      }, new Constant(0));
    
    const variables = this.terms
      .filter((item): item is Variable => item instanceof Variable);

    return new Expression([...variables, constant]);
  }

  has(item: Term) {
    return this.terms.includes(item);
  }

  add(expr: Expression) {
    return new Expression([...this.terms, ...expr.terms ]).evaluate();
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
    return this.terms.map((item) => item.toTexString()).join('+');
  }

  toNumber() {
    return this.terms.reduce((last, item) => {
      if (item instanceof Variable) {
        throw new Error(`Expression has unassigned variable ${Variable.name}`);
      }

      return last + item.evaluate();
    }, 0);
  }

  private substituteOne(name: symbol | string, value: number) {
    return new Expression(
      this.terms.map((item) => {
        if (item instanceof Constant) return item;
        if (item.name !== name) return item;
        return item.substitute(value);
      }),
    );
  }
}
