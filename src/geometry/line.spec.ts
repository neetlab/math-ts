import { $ } from "../_utils"
import { Line } from "./line"
import { Cartesian as Point } from "./coordinate"

test(`
      |ax1 + by1 + c|
  d = ---------------
        √a^2 + b^2
`, () => {
  const d = new Line(
    $(3, 'x').plus(4, 'y').plus(4).isEqualTo($(0))
  ).getDistance(new Point(1, 2));

  expect(d).toBe(3);
})
