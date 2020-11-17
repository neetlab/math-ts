import { Relationship, RelationshipType, Exclusive, Conditional, Unrelated } from './relationship';
import { Event } from './event';
import { DefaultMap, ReadonlyDefaultMap } from '../_utils';

export class Binding {
  constructor (
    readonly subject: Event,
    readonly relationships: ReadonlyDefaultMap<Event, Relationship> =
      new DefaultMap([], () => new Unrelated())
  ) {}

  unrelatedTo(object: Event) {
    return this.relate(object, new Unrelated());
  }

  exclusiveTo(object: Event) {
    return this.relate(object, new Exclusive());
  }

  conditionalOn(object: Event, condition: Event) {
    return this.relate(object, new Conditional(condition));
  }

  sync(binding: Binding) {
    const { relationships, subject: object } = binding;

    return [...relationships.entries()]
      .filter(([event]) => event === this.subject)
      .reduce((last, [, relationship]) => {
        switch (relationship.type) {
          case RelationshipType.UNRELATED:
            return last.unrelatedTo(object);
          case RelationshipType.EXCLUSIVE:
            return last.exclusiveTo(object);
          case RelationshipType.CONDITIONAL:
            return last.conditionalOn(object, relationship.event);
        }
      }, this as Binding);
  }

  private relate(object: Event, relationship: Relationship) {
    return new Binding(
      this.subject,
      new DefaultMap([
        ...this.relationships.entries(),
        [object, relationship],
      ], this.relationships.defaultValue),
    );
  }
}
