import { SampleSpace, Event } from "../probability";

export const testConvergence = (sampleSpace: SampleSpace, event: Event, repeat = 1000) => {
  let trueCount = 0;

  for (let i = 0; i < repeat; i++) {
    if (sampleSpace.experiment(event).result) {
      trueCount++;
    };
  }

  console.log(`Expected ${event.probability} / Got ${trueCount / repeat}`);

  return trueCount / repeat;
}
