export const factorial = (n: number) =>
  Array.from({ length: n }, (_, i) => n - i).reduce((p, c) => p * c, 1);

export const permutation = (n: number, r: number) =>
  factorial(n) / factorial(n - r);
