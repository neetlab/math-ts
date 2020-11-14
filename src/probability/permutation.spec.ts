import { Possibility } from ".";

describe('permutation', () => {

  // r = n のとき、順列は単純にn!だけど
  // r < n のときがエッジケースなので反対の順列 (n-r)! で割ると要らない分を除去できる
  test('nPr / r!', () => {
    Possibility.permute([1, 2, 3], 2).length === Possibility.nPr(3, 2);
  });
});
