import { Relationship, RelationshipType, Independent, Exclusive, Conditional } from './relationship';
import { Event } from './event';
import { DefaultMap, ReadonlyDefaultMap } from '../_utils';

export class Binding {
  constructor (
    readonly subject: Event,
    readonly relationships: ReadonlyDefaultMap<Event, Relationship> =
      new DefaultMap([], () => new Independent())
  ) {}

  independentFrom(object: Event) {
    return this.relate(object, new Independent());
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
          // Exclusive and independent are bidirectional
          case RelationshipType.EXCLUSIVE:
            return last.exclusiveTo(object);
          case RelationshipType.INDEPENDENT:
            return last.independentFrom(object);
          // Condition is unidirectional
          case RelationshipType.CONDITIONAL:
            return last;
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
