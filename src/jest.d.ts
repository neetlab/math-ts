import "jest";
import { Eq } from "./interfaces";

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toEq<E extends unknown>(eq: Eq<E>): R;
    }
  }
}
