import { Eq } from '../interfaces';

expect.extend({
  toEq(received: Eq<unknown>, expected: Eq<unknown>) {
    const pass = received.equals(expected);

    return {
      pass,
      message: () => pass ? 'ok' : `Eq.equals method returned false for ${expected}`
    };
  },
});
