import { Sum, Eq } from "../interfaces";

export class Vector implements Sum<Vector>, Eq<Vector> {
  constructor(readonly x: number, readonly y: number, readonly z: number) {}

  get norm() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  add(that: Vector) {
    return new Vector(this.x + that.x, this.y + that.y, this.z + that.z);
  }

  multiply(k: number) {
    return new Vector(this.x * k, this.y * k, this.z * k);
  }

  equals(that: Vector) {
    return this.x === that.x && this.y === that.y && this.z === that.z;
  }

  dotProd(that: Vector) {
    return this.x * that.x + this.y * that.y + this.z * that.z;
  }

  getAngle(that: Vector) {
    return Math.acos((this.dotProd(that) / this.norm) * that.norm);
  }
}
