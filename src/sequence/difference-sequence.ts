import { Sequence } from './sequence';

export class DifferenceSequence extends Sequence {
  private readonly parent: Sequence;

  constructor(parent: Sequence) {
    super();
    this.parent = parent;
  }  

  get first() {
    return this.getNth(0);
  }

  get length() {
    return this.parent.length - 1;
  }

  getNth(n: number) {
    return this.parent.getNth(n + 1) - this.parent.getNth(n);
  }

  equals(that: DifferenceSequence) {
    return this.parent.equals(that.parent);
  }
}

