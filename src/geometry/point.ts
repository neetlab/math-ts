import { Eq, Tex } from "../_interfaces";

export class Point implements Eq<Point>, Tex {
  constructor(
    readonly x: number,
    readonly y: number,
  ) {}

  static from([x, y]: [number, number]) {
    return new Point(x, y);
  }

  equals(that: Point) {
    return this.x === that.x && this.y === that.y;
  }

  toArray() {
    return [this.x, this.y];
  }

  toTexString() {
    return `(${this.x}, ${this.y})`;
  }
}
