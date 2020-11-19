class PipeMap<K, V> extends Map<K, V> implements ReadonlyMap<K, V> {
  constructor(entries?: readonly (readonly [K, V])[] | null) {
    super(entries); 
  }

  get and(): VariablesFactory['where'] {
    return new VariablesFactory(this as unknown as PipeMap<string | symbol, number>).where;
  }
}

class VariablesFactory {
  constructor(private readonly map = new PipeMap<string | symbol, number>()) {}  

  where = (name: string | symbol) => ({
    is: (value: number) => {
      return new PipeMap([...this.map.entries()].concat([name, value]));
    }
  });
}

const singleton = new VariablesFactory();
export const where = singleton.where.bind(singleton);
