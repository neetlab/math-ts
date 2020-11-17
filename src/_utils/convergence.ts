import { Event } from "../probability";

export const testConvergence = (event: Event, repeat = 1000) => {
  let trueCount = 0;

  for (let i = 0; i < repeat; i++) {
    if (event.experiment()) {
      trueCount++;
    };
  }

  console.log(`Expected ${event.probability} / Got ${trueCount / repeat}`);

  return trueCount / repeat;
}
