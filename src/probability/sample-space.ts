import { Event } from "./event";
import { Conditional, Exclusive } from "./relationship";
import { Binding } from './binding';
import { nCr } from "./combination";
import { DefaultMap, ReadonlyDefaultMap } from "../_utils";

interface ExperimentResponse {
  readonly result: boolean;
  readonly sampleSpace: SampleSpace;
}

export class SampleSpace {
  constructor(
    private readonly events: ReadonlySet<Event> = new Set(),
    private readonly bindings: ReadonlyDefaultMap<Event, Binding> =
      new DefaultMap<Event, Binding>([], () => new Binding()),
    private readonly happenings: ReadonlyDefaultMap<Event, number> =
      new DefaultMap<Event, number>([], 0),
  ) {}

  addEvent(event: Event) {
    return new SampleSpace(
      new Set([...this.events.values(), event]),
      this.bindings,
    );
  }

  relate(event: Event, callback: (binding: Binding) => Binding) {
    const relationships = callback(this.bindings.get(event));

    return new SampleSpace(
      this.events, 
      new DefaultMap([
        ...this.bindings,
        [event, relationships],
      ], this.bindings.defaultValue)
    );
  }

  experiment(a: Event): ExperimentResponse {
    if (this.hasExclusiveEventHappened(a)) {
      return { result: false, sampleSpace: this };
    }

    const result = Math.random() <= a.probability;
    if (!result) {
      return { result, sampleSpace: this };
    }

    const sampleSpace = new SampleSpace(
      this.events,
      this.bindings,
      new DefaultMap([
        ...this.happenings,
        [a, (this.happenings.get(a) ?? 0) + 1],
      ], this.happenings.defaultValue),
    );
    
    return { result, sampleSpace }
  }

  // P(A∪B) = A∪B - A∩B
  // 独立してたら「-A∩B」が0なので同じ処理でOK
  getUnion(a: Event, b: Event) {
    return a.add(b).subtract(this.getIntersection(a, b));
  }

  getIntersection(a: Event, b: Event) {
    const relationship = this.bindings.get(a).relationships.get(b);

    if (relationship instanceof Exclusive) {
      return new Event(0);
    }

    if (relationship instanceof Conditional) {
      return a.multiply(relationship.event);
    }

    // 積の法則
    return a.multiply(b);
  }

  getComplement(a: Event) {
    return new Event(Math.max(0, 1 - a.probability));
  }

  // nCr*p^r*(1-p)^(n-r)
  repeat(a: Event, n: number, r: number) {
    return new Event(nCr(n, r) * a.probability ** r * this.getComplement(a).probability ** (n-r));
  }

  private hasExclusiveEventHappened(a: Event) {
    const binding = this.bindings.get(a);

    return [...binding.relationships.entries()]
      .filter(([, relationship]) => relationship instanceof Exclusive)
      .some(([b]) => (this.happenings.get(b) ?? 0) >= 1);
  }
}
