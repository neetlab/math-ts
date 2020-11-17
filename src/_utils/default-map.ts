export class DefaultMap<K, V> implements Map<K, V> {
  private readonly map: Map<K, V>;
  readonly size: number;
  [Symbol.toStringTag]: string;

  constructor (values: [K, V][], readonly defaultValue: V | (() => V)) {
    this.map = new Map(values);
    this.size = this.map.size;
    this[Symbol.toStringTag] = this.map[Symbol.toStringTag];
  }

  get(key: K): V {
    // @ts-ignore
    return this.map.get(key) ?? typeof this.defaultValue === 'function' ? this.defaultValue(key) : this.defaultValue;
  }

  set(key: K, value: V) {
    this.map.set(key, value);
    return this;
  }

  delete(key: K) {
    return this.map.delete(key);
  }

  clear() {
    this.clear();
    return this;
  }

  has(key: K) {
    return this.map.has(key);
  }

  forEach(fn: (v: V, k: K, fn: Map<K, V>) => void) {
    this.map.forEach(fn);
  }

  keys() {
    return this.map.keys();
  }

  values() {
    return this.map.values();
  }

  entries() {
    return this.map.entries();
  }

  [Symbol.iterator]() {
    return this.map[Symbol.iterator]();
  }
}

export interface ReadonlyDefaultMap<K, V> extends ReadonlyMap<K, V> {
  readonly defaultValue: V | ((k?: K) => V);
  get(k: K): V;
}
