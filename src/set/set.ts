export const isSuperset = <T>(a: Set<T>, b: Set<T>) => {
  return [...b.values()].every(value => a.has(value));
}

export const isSubset = <T>(a: Set<T>, b: Set<T>) => {
  return isSuperset(b, a);
}

export const getUnion = <T>(a: Set<T>, b: Set<T>) => {
  return new Set([...a.values(), ...b.values()]);
}

export const getIntersection = <T>(a: Set<T>, b: Set<T>) => {
  return new Set([...a.values()].filter(value => b.has(value)));
}

