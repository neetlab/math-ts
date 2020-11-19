import { Tex } from "../_interfaces";

class VariablesBuilder implements Tex {
  constructor(private readonly map = new Map<string | symbol, number>()) {}  

  and = (name: string | symbol, value: number) => {
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
