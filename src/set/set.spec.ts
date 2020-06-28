test("de morgan's law", () => {
  const a = true,
    b = false;

  expect(!(a || b)).toBe(!a && !b);
  expect(!(a && b)).toBe(!a || !b);
});
