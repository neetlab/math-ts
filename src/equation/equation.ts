import { Show } from '../_interfaces';
import { Constant, Item, Variable } from './item';

export type Solution = ReadonlyMap<string | symbol, number>;

export class Equation implements Show {
  constructor(
    readonly items: Item[],
  ) {}

  test(solution: Solution) {
    return this.substitute(solution) === 0;
  }

  private substitute(solution: Solution) {
    return [...this.items.values()]
      .map((item) => {
        if (item instanceof Constant) return item.evaluate();
        if (item instanceof Variable) {
          const value = solution.get(item.name)
          if (value == null) throw new TypeError();
          return item.substitute(value).evaluate();
        }
        throw new TypeError();
      })
      .reduce((x, y) => x + y, 0);
  }

  toString() {
    const equation = this.items
      .map((item, i) => {
        const operator = (i === 0 || item.isNegativeFactor()) ? '' : '+';
        const expr = item.toString().match(/\$(.+?)\$/)![1];
        return operator + expr;
      })
      .join('');
    return '$' + equation + '=0$';
  }
}
