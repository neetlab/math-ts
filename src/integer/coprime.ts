import { gcd } from "./gcd";

export const isCoprime = (a: number, b: number) => gcd(a, b) === 1;
