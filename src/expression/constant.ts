import { Show } from '../_interfaces';
import { Item } from './item';

export const CONSTANT = Symbol();

export class Constant implements Item, Show {
  readonly _tag = 'constant';
  readonly name = CONSTANT;

  constructor (
    readonly value: number,
  ) {}

  evaluate() {
    return this.value;
  }

  isNegativeFactor() {
    return this.value < 0;
  }

  show() {
    return this.value.toString();
  }
}
