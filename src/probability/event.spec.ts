import { Event } from "./event";

describe('Event', () => {
  test('the probability will never be greater than 1', () => {
    const a = new Event(1);
    const b = new Event(1);

    expect(a.add(b).probability).toBe(1);
  })
})
