export class Vector {
  constructor(readonly x: number, readonly y: number, readonly z: number) {}

  getNorm() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
}

export const add = (v1: Vector, v2: Vector) => {
  return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
};

export const dotProd = (v1: Vector, v2: Vector) => {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
};
