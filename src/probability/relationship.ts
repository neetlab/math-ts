import { Event } from './event';

enum RelationshipType {
  EXCLUSIVE,
  INDEPENDENT,
  CONDITIONAL,
};

export class Exclusive {
  readonly type = RelationshipType.EXCLUSIVE;
}

export class Independent {
  readonly type = RelationshipType.INDEPENDENT;
}

export class Conditional {
  readonly type = RelationshipType.CONDITIONAL;

  constructor (
    readonly event: Event,
  ) {}
}

export type Relationship = Exclusive | Independent | Conditional;

export class Relationships implements ReadonlyMap<Event, Relationship> {
  readonly size: number;

  constructor (
    private readonly relationships: ReadonlyMap<Event, Relationship> = new Map(),
  ) {
    this.size = this.relationships.size;
  }

  get(event: Event): Relationship {
    return this.relationships.get(event) ?? new Independent();
  }

  has(event: Event) {
    return this.relationships.has(event);
  }

  forEach(fn: (v: Relationship, k: Event, map: ReadonlyMap<Event, Relationship>) => void) {
    this.relationships.forEach(fn);
  }

  keys() {
    return this.relationships.keys();
  }

  values() {
    return this.relationships.values();
  }

  entries() {
    return this.relationships.entries();
  }

  [Symbol.iterator]() {
    return this.relationships[Symbol.iterator]();
  }

  independentFrom(event: Event) {
    return this.relate(event, new Independent());
  }

  exclusiveTo(event: Event) {
    return this.relate(event, new Exclusive());
  }

  conditionalOn(event: Event, condition: Event) {
    return this.relate(event, new Conditional(condition));
  }

  private relate(event: Event, relationship: Relationship) {
    return new Relationships(
      new Map([
        ...this.relationships.entries(),
        [event, relationship],
      ]),
    );
  }
}
