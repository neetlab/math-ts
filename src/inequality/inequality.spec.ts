import { $, where } from "../_utils";

test('2x > x', () => {
  const inequality = $(2, 'x').isGreaterThan($('x'));
  expect(inequality.test(where('x', 1).toMap())).toBe(true);
  expect(inequality.test(where('x', -1).toMap())).toBe(false);
});
