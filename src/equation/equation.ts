import { Constant, Item } from './item';

export type Solution<T extends symbol> = ReadonlyMap<T, number>;

export class Equation<T extends symbol> {
  constructor(
    readonly items: Item<T>[],
  ) {}

  test(values: Solution<T>) {
    return this.getLeft(values) === 0;
  }

  solve(
    solutionGenerator: (name: T) => number = Math.random,
  ) {
    while (true) {
      const map = new Map(
        this.items.map((item) => [item.name, solutionGenerator(item.name) ]),
      );

      if (this.test(map)) return map;
    }
  }

  private getLeft(values: Solution<T>) {
    return [...this.items.values()]
      .map((item) => {
        if (item instanceof Constant) return item.evaluate();
        const value = values.get(item.name)
        if (value == null) throw new TypeError();
        return item.evaluate(value);
      })
      .reduce((x, y) => x + y, 0);
  }
}
