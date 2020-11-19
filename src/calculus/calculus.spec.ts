import { $, where } from '../_utils';
import { x } from '../expression';
import { differentiate } from './differential'
import { integrate, CONSTANT_OF_INTEGRATION as C } from './integral';

describe('calculus', () => {
  test("∫f'(x) = f(x)", () => {
    const f = $(3, x, 2).plus(2, x).plus(5).toFunction()
    const fp = differentiate(f);
    const F = integrate(fp).d(x);
    expect(f).toEq(F.partial(where(C, 5).toMap()));
  })
});
