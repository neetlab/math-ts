import { Probability } from ".";

describe('combination', () => {

  // [1,2,3]から2のとき、
  // {1,2}の順列に於いて{2,1}他の1通りが重複 -> r!で割るとユニークに
  test('nPr / r!', () => {
    Probability.combine(new Set([1, 2, 3]), 2).length === Probability.nCr(3, 2);
  });
});
