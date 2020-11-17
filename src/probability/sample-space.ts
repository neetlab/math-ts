import { Event } from "./event";
import { Conditional, Exclusive, Relationship, Independent } from "./relationship";
import { Binding } from './binding';
import { nCr } from "./combination";
import { DefaultMap, ReadonlyDefaultMap } from "../_utils";

interface ISampleSpace {
  relate(event: Event, callback: (binding: Binding) => Binding): ISampleSpace;
  repeat(a: Event, n: number, r: number): Event;
  getUnion(a: Event, b: Event): Event;
  getIntersection(a: Event, b: Event): Event;
  getComplement(a: Event): Event;
}

export class SampleSpace implements ISampleSpace {
  private readonly bindings: ReadonlyDefaultMap<Event, Binding>;

  constructor(
    private readonly events: readonly Event[],
    bindings?: ReadonlyDefaultMap<Event, Binding> ,
    private readonly happenings: ReadonlyDefaultMap<Event, number>
      = new DefaultMap<Event, number>([], 0),
  ) {
    if (bindings == null) {
      bindings = new DefaultMap<Event, Binding>(
        events.map((event) => [event, new Binding(event)]),
        (k: Event) => new Binding(k),
      );
    }

    this.bindings = bindings;
  }

  relate(event: Event, callback: (binding: Binding) => Binding) {
    const newBinding = callback(this.bindings.get(event));

    const newBindings = [...this.bindings.entries()]
      .map(([event, binding]) => [event, binding.sync(newBinding)] as [Event, Binding])
      .concat([[event, newBinding] as [Event, Binding]])

    return new SampleSpace(
      this.events, 
      new DefaultMap(newBindings, this.bindings.defaultValue),
      this.happenings,
    );
  }

  // nCr*p^r*(1-p)^(n-r)
  repeat(a: Event, n: number, r: number) {
    return new Event(nCr(n, r) * a.probability ** r * this.getComplement(a).probability ** (n-r));
  }

  getRelationship(a: Event, b: Event): Relationship {
    return this.bindings.get(a).relationships.get(b);
  }

  // P(A∪B) = A∪B - A∩B
  // 独立してたら「-A∩B」が0なので同じ処理でOK
  getUnion(a: Event, b: Event) {
    return a.add(b).subtract(this.getIntersection(a, b));
  }

  getIntersection(a: Event, b: Event): Event {
    const relationship = this.bindings.get(a).relationships.get(b);

    if (relationship instanceof Exclusive) {
      return new Event(0);
    }

    if (relationship instanceof Conditional) {
      return a.multiply(relationship.event);
    }

    return this.getConditionalEvent(a, b).multiply(b);
  }

  getConditionalEvent(requirement: Event, event: Event): Event {
    const relationship = this.bindings.get(requirement).relationships.get(event)

    if (relationship instanceof Exclusive) {
      return new Event(0);
    }

    if (relationship instanceof Independent) {
      return event;
    }

    return this.getIntersection(requirement, event).divide(requirement);
  }

  getComplement(a: Event) {
    return new Event(Math.max(0, 1 - a.probability));
  }
}
