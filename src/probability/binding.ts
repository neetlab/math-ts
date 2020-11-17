import { Relationship, Independent, Exclusive, Conditional } from './relationship';
import { Event } from './event';
import { DefaultMap, ReadonlyDefaultMap } from 'src/_utils/default-map';

export class Binding {
  constructor (
    readonly relationships: ReadonlyDefaultMap<Event, Relationship> =
      new DefaultMap([], () => new Independent())
  ) {}

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
    return new Binding(
      new DefaultMap([
        ...this.relationships.entries(),
        [event, relationship],
      ], this.relationships.defaultValue),
    );
  }
}
