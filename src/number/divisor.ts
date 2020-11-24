import * as Z from "./integer";
// import * as R from './real';
import * as N from './natural';


export const gcd = (a: Z.Integer, b: Z.Integer): Z.Integer => {
  return b === Z.zero ? a : gcd(b, Z.mod(a, b));
}

export const lcm = (a_: Z.Integer, b_: Z.Integer): N.Natural =>  {
  // L.C.M. は a, b 両方で割れる最小の正の数なので、符号は関係ない
  const a = N.abs(a_);
  const b = N.abs(b_);

  //             | a . b |
  // lcm(a,b) = -----------
  //              gcd(a,b)
  return N.div(
    N.mul(a, b),
    N.abs(gcd(N.getInteger(a), N.getInteger(b))),
  );
}
