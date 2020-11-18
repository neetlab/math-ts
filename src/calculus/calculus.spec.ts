import { Expression, Variable } from '../expression';
import { Function } from '../function';
import { differentiate } from './differential'
import { integrate, C } from './integral';

describe('calculus', () => {
  const f1 = new Function(new Expression([
    new Variable('x', 1/3, 3), C,
  ]));

  const f2 = new Function(new Expression([
    new Variable('x', 1, 2),
  ]));

  console.log(f2.toTexString(), f1.toTexString());
  console.log(differentiate(f1).toTexString(), integrate(f2).d('x').toTexString());

  expect(differentiate(f1)).toEq(f2);
  expect(integrate(f2).d('x')).toEq(f1);
});
