import { Variable } from "../expression";
import { Tex } from "../_interfaces";

class VariablesBuilder implements Tex {
  constructor(private readonly map = new Map<string | symbol, number>()) {}  

  and(name: Variable | string | symbol, value: number) {
    if (name instanceof Variable) {
      return new VariablesBuilder(new Map([...this.map.entries(), [name.name, value]]));
    }
    return new VariablesBuilder(new Map([...this.map.entries(), [name, value]]));
  };

  toMap() {
    return this.map;
  }

  toTexString() {
    return `${[...this.map.entries()].map(([name, value]) => `${name.toString()}=${value}`).join(', ')}`;
  }
}

const singleton = new VariablesBuilder();
export const where = singleton.and.bind(singleton);
