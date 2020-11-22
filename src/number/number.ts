import { Complex } from './complex';
import { Integer } from './integer';
import { Real } from './real';
import { Natural } from './natural';
import { Rational } from './rational';

export type Number = Complex | Real | Integer | Natural | Rational;

