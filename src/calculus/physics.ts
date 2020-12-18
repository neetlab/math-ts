import { Vector } from "../vector";
import { Function } from "../function";
import { differentiate } from "./differential";

export const t = 't';
type XY = [Function, Function];

const empty = new Map()

export const getVelocity = ([x, y]: XY) => {
  return new Vector(
    differentiate(x).d(t).call(empty).toNumber(),
    differentiate(y).d(t).call(empty).toNumber(),
    0,
  );
}

export const getAcceleration = ([x, y]: XY) => {
  return new Vector(
    differentiate(differentiate(x).d(t)).d(t).call(empty).toNumber(),
    differentiate(differentiate(y).d(t)).d(t).call(empty).toNumber(),
    0,
  );
}
