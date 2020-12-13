import { Cartesian, Polar } from './coordinate';

describe('Cartesian', () => {
  test('movable', () => {
    const xy = new Cartesian(1, 2);
    const xyp = xy.move(1, 1);
    expect(xyp.x).toBe(2);
    expect(xyp.y).toBe(3);
  });

  test('distance', () => {
    const xy = new Cartesian(1, 2);
    expect(xy.distance).toBe(Math.sqrt(5));
  });

  test('polar', () => {
    const xy = new Cartesian(1, 1);
    expect(xy.toPolar().r).toBe(Math.sqrt(2));
    expect(xy.toPolar().theta).toBeCloseTo(Math.PI / 4);
  });
});

describe('Polar', () => {
  test('rotate', () => {
    const p = new Polar(1, Math.PI / 2);
    expect(p.rotate(Math.PI / 2).theta).toBeCloseTo(Math.PI);
  });

  test('scale', () => {
    const p = new Polar(1, Math.PI / 2);
    expect(p.scale(2).r).toBe(2);
    expect(p.scale(2).theta).toBeCloseTo(Math.PI / 2);
  });

  test('cartesian', () => {
    const p = new Polar(1, Math.PI / 2);
    const pp = p.toCartesian();
    expect(pp.x).toBeCloseTo(0);
    expect(pp.y).toBeCloseTo(1);
  });
});
