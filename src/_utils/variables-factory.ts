class VariablesBuilder {
  constructor(private readonly map = new Map<string | symbol, number>()) {}  

  and = (name: string | symbol, value: number) => {
    return new VariablesBuilder(new Map([...this.map.entries()].concat([name, value])));
  };

  toMap() {
    return this.map;
  }
}

const singleton = new VariablesBuilder();
export const where = singleton.and.bind(singleton);
