import { Semiring } from 'fp-ts/lib/Semiring';

enum Sign {
  POS,
  NEG,
}

interface Infinity {
  readonly _tag: 'infinity';
  readonly sign: Sign;
}

const infinity: Infinity    = { _tag: 'infinity', sign: Sign.POS };
const negInfinity: Infinity = { _tag: 'infinity', sign: Sign.NEG };

export const semiringInfinity: Semiring<Infinity> = {
  zero: infinity,
  one:  infinity,
  add: (_x, _y) => infinity,
  mul: (x, y)   => (x.sign === Sign.NEG || y.sign === Sign.NEG) ? negInfinity : infinity,
}
