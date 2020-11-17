import { Event } from './event';

export enum RelationshipType {
  INDEPENDENT = 'independent',
  EXCLUSIVE = 'exclusive',
  CONDITIONAL = 'conditional',
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
