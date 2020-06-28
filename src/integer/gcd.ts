export const gcd = (x: number, y: number): number => {
  return y === 0 ? x : gcd(y, x % y);
}
