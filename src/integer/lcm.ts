import { gcd } from "./gcd"

export const lcm = (x: number, y: number) => {
  const G = gcd(x, y);
  const X = x / G;
  const Y = y / G;
  return G * X * Y;
}
