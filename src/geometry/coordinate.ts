export class Cartesian {
  constructor(
    readonly x: number,
    readonly y: number,
  ) {}

  move(x: number, y: number) {
    return new Cartesian(this.x + x, this.y + y);
  }

  get distance() {
    return Math.hypot(this.x, this.y);
  }

  toPolar() {
    return new Polar(
      this.distance,
      Math.acos(this.x / this.distance),
    );
  }
}

export class Polar {
  constructor (
    readonly r: number,
    readonly theta: number,
  ) {}

  rotate(theta: number) {
    return new Polar(this.r, this.theta + theta);
  }

  scale(factor: number) {
    return new Polar(this.r * factor, this.theta);
  }

  isPole() {
    return this.r == 0;
  }

  toCartesian() {
    return new Cartesian(
      this.r * Math.cos(this.theta),
      this.r * Math.sin(this.theta),
    );   
  }
}
