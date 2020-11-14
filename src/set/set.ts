export const isSuperset = <T>(a: ReadonlySet<T>, b: ReadonlySet<T>) => {
  return [...b.values()].every(value => a.has(value));
}

export const isSubset = <T>(a: ReadonlySet<T>, b: ReadonlySet<T>) => {
  return isSuperset(b, a);
}

export const getUnion = <T>(a: ReadonlySet<T>, b: ReadonlySet<T>) => {
  return new Set([...a.values(), ...b.values()]);
}

export const getIntersection = <T>(a: ReadonlySet<T>, b: ReadonlySet<T>) => {
  return new Set([...a.values()].filter(value => b.has(value)));
}

export const getComplement = <T>(a: ReadonlySet<T>, b: ReadonlySet<T>) => {
  const [universalSet, subset] = isSuperset(a, b) ? [a, b] : [b, a];
  return new Set([...universalSet.values()].filter(value => !subset.has(value)));
}

export const equals = <T>(a: ReadonlySet<T>, b: ReadonlySet<T>) => {
  return isSubset(a, b) && isSuperset(a, b);
}
