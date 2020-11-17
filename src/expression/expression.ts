import { immerable } from 'immer';
import { Eq, Tex } from '../_interfaces';
import { Constant } from './constant';
import { Variable } from './variable';

export type Item = Variable | Constant;
export type Values = ReadonlyMap<string | symbol, number>;

export class Expression implements Tex, Eq<Expression> {
  readonly [immerable] = true;

  constructor(
    private readonly items: Item[] = [new Constant(0)],
  ) {}

  getVariables() {
    return this.items.filter((item): item is Variable => item instanceof Variable);
  }

  getConstants() {
    return this.items.filter((item): item is Constant => item instanceof Constant);
  }

  evaluate() {
    const constant = this.items
      .filter((item): item is Constant => item instanceof Constant)
      .reduce((last, item) => {
        return last.add(item);
      }, new Constant(0));
    
    const variables = this.items
      .filter((item): item is Variable => item instanceof Variable);

    return new Expression([...variables, constant]);
  }

  substitute(values: Values) {
    return [...values.entries()]
      .reduce((expr, [name, value]) => expr.substituteOne(name, value), this as Expression)
      .evaluate();
  }

  equals(that: Expression) {
    return this.items.every(a => that.items.some(b => b.equals(a)));
  }

  toTexString() {
    return this.items.map((item) => item.toTexString()).join('+');
  }

  toNumber() {
    return this.items.reduce((last, item) => {
      if (item instanceof Variable) {
        throw new Error(`Expression has unassigned variable ${Variable.name}`);
      }

      return last + item.evaluate();
    }, 0);
  }

  private substituteOne(name: symbol | string, value: number) {
    return new Expression(
      this.items.map((item) => {
        if (item instanceof Constant) return item;
        if (item.name !== name) return item;
        return item.substitute(value);
      }),
    );
  }
}
