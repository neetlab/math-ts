import { Event } from "./event";
import { Conditional, Exclusive, Relationships } from "./relationship";
import { nCr } from "./combination";

interface ExperimentResponse {
  result: boolean;
  sampleSpace: SampleSpace;
}

export class SampleSpace {
  constructor(
    private readonly events: ReadonlySet<Event> = new Set(),
    private readonly bindings: ReadonlyMap<Event, Relationships> = new Map(),
    private readonly happenings: ReadonlyMap<Event, number> = new Map(),
  ) {}

  addEvent(event: Event) {
    return new SampleSpace(
      new Set([...this.events.values(), event]),
      this.bindings,
    );
  }

  relate(event: Event, callback: (relationships: Relationships) => Relationships) {
    const relationships = callback(this.bindings.get(event) ?? new Relationships());

    return new SampleSpace(
      this.events, 
      new Map([
        ...this.bindings,
        [event, relationships],
      ])
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
      new Map([
        ...this.happenings,
        [a, (this.happenings.get(a) ?? 0) + 1],
      ]),
    );
    
    return { result, sampleSpace }
  }

  // P(A∪B) = A∪B - A∩B
  // 独立してたら「-A∩B」が0なので同じ処理でOK
  getUnion(a: Event, b: Event) {
    return a.add(b).subtract(this.getIntersection(a, b));
  }

  getIntersection(a: Event, b: Event) {
    const relationships = this.bindings.get(a);

    if (relationships == null) {
      throw new TypeError('Relationship for a is not registered');
    }

    const relationship = relationships.get(b);

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
    const relationships = this.bindings.get(a) ?? new Relationships();

    return [...relationships.entries()]
      .filter(([, relationship]) => relationship instanceof Exclusive)
      .some(([b]) => (this.happenings.get(b) ?? 0) >= 1);
  }
}
