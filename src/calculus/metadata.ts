import { Function } from '../function';
import { Equation } from '../equation';
import { differentiate } from './differential';
import { $, where } from '../_utils';


const getSiblingValue = (f: Function, x: string | symbol, a: number, b: number) => {
  const ab = (a + b) / 2;
  return f.call(where(x, ab).toMap()).toNumber();
}

const checkIfSignsAreEqual = (a: number, b: number) => {
  return (a > 0 && b < 0) || (a < 0 && b > 0) || (a === 0 && b === 0);
}

/**
 * 極値:
 * x=aで極地を取る ==> f'(a)=0
 * f'(a) = 0 & 前後で符号が変わる <==> x=aで極地を取る
 */
export const getExtrema = (f: Function, x: string | symbol): number[] => {
  const secondDerivative = differentiate(f).d(x);

  return new Equation(secondDerivative.expression, $(0).$)
    .solve()
    .filter((v, i, s) => {
      const curr = v;
      const prev = getSiblingValue(f, x, v, s[i + 1] ?? 0);
      return checkIfSignsAreEqual(curr, prev);
    })
    .map((v) => f.call(where(x, v).toMap()).toNumber());
}

/**
 * 変曲点:
 * x=aが変曲点 ==> f''(a)=0
 * f''(a)=0 & 前後で符号が変わる <==> x=aが変曲点
 */
export const getInflections = (f: Function, x: string | symbol): number[] => {
  const thirdDerivative = differentiate(differentiate(f).d(x)).d(x);

  return new Equation(thirdDerivative.expression, $(0).$)
    .solve()
    .filter((v, i, s) => {
      const curr = v;
      const prev = getSiblingValue(f, x, v, s[i + 1] ?? 0);
      return checkIfSignsAreEqual(curr, prev);
    })
    .map((v) => f.call(where(x, v).toMap()).toNumber());
}
