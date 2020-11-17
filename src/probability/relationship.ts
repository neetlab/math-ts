import { Event } from './event';

export enum RelationshipType {
  UNRELATED = 'unrelated',
  EXCLUSIVE = 'exclusive',
  CONDITIONAL = 'conditional',
};

export class Exclusive {
  readonly type = RelationshipType.EXCLUSIVE;
}

export class Unrelated {
  readonly type = RelationshipType.UNRELATED;
}

export class Conditional {
  readonly type = RelationshipType.CONDITIONAL;

  constructor (
    readonly event: Event,
  ) {}
}

export type Relationship = Exclusive | Unrelated | Conditional;
