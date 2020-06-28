import { Eq } from '../_interfaces';

expect.extend({
  toEq<T extends Eq<unknown>>(received: T, expected: T) {
    const pass = received.equals(expected);

    return {
      pass,
      message: () => pass ? 'ok' : `Eq.equals method returned false for ${expected}`
    };
  },
});
