import { $, where } from '../_utils';
import { x } from '../expression';
import { differentiate } from './differential'
import { integrate, CONSTANT_OF_INTEGRATION as C } from './integral';
import { Function } from '../function';

describe('calculus', () => {
  test("∫f'(x) = f(x)", () => {
    const f = $(3, x, 2).plus(2, x).plus(5).toFunction()
    const fp = differentiate(f).d(x);
    const F = integrate(fp).d(x);
    expect(f).toEq(F.partial(where(C, 5).toMap()));
  })

  test("{kf(x)}'=kf'(x)", () => {
    const k  = 4;
    const f  = $(3, x, 2).plus(2, x).plus(5).toFunction();
    const kf = new Function(f.expression.multiply(k));

    const v = where(x, 1).toMap();
    const dfDx = differentiate(f).d(x);
    const dkfDx = differentiate(kf).d(x);

    expect(dfDx.call(v).toNumber() * k).toBe(dkfDx.call(v).toNumber());
  });
});
