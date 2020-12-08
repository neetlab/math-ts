import { Polar } from "./polar";

describe('Polar', () => {
  test('|z_1 z_2| = |z_1||z_2|', () => {
    const z1 = new Polar(2, Math.PI/3);
    const z2 = new Polar(2, Math.PI/3);
    expect(z1.mul(z2).toComplex().abs()).toBeCloseTo(z1.toComplex().abs() * z2.toComplex().abs(), 5);
  });

  test('arg z_1 z_2 = arg z_1 + arg z_2', () => {
    const z1 = new Polar(2, Math.PI/3);
    const z2 = new Polar(2, Math.PI/3);
    expect(z1.mul(z2).arg).toBe(z1.arg + z2.arg);
  });

  test('|z_1/z_2| = |z_1|/|z_2|', () => {
    const z1 = new Polar(2, Math.PI/3);
    const z2 = new Polar(2, Math.PI/3);
    expect(z1.div(z2).toComplex().abs()).toBeCloseTo(z1.toComplex().abs() / z2.toComplex().abs(), 5);
  });

  test('arg z_1 z_2 = arg z_1 + arg z_2', () => {
    const z1 = new Polar(2, Math.PI/3);
    const z2 = new Polar(2, Math.PI/3);
    expect(z1.div(z2).arg).toBe(z1.arg - z2.arg);
  });
});
