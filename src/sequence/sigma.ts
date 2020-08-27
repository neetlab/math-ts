export const sigma = (k: number, n: number, expr: (n: number) => number) => {
  let i = k;
  let sum = 0;

  while (i <= n) {
    sum += expr(i);
    i++;
  }

  return sum;
}
