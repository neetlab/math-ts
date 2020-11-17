import { Event } from './event';
import { SampleSpace } from './sample-space';

describe('Event', () => {
  it('returns always true when P(A) = 1', () => {
    const a = new Event(1);
    const { result } = new SampleSpace().addEvent(a).experiment(a)
    expect(result).toBe(true);
  });

  it('returns always false when P(A) = 0', () => {
    const a = new Event(0);
    const { result } = new SampleSpace().addEvent(a).experiment(a)
    expect(result).toBe(false);
  });

  test('nCr*p^r*(1-p)^(n-r)', () => {
    const p = new Event(0.5)
    const sampleSpace = new SampleSpace().addEvent(p)
    const repeatedP = sampleSpace.repeat(p, 10, 5) 
    expect(repeatedP.probability).toBe(0.24609375);
  });

  it('returns false when event A and B are exclusive', () => {
    const a = new Event(0.1);
    const b = new Event(0.1);

    const sampleSpace = new SampleSpace()
      .addEvent(a)
      .addEvent(b)
      .relate(a, bind => bind.exclusiveTo(b))

    const c = sampleSpace.getIntersection(a, b);
    expect(sampleSpace.experiment(c).result).toBe(false);
  });

  test('relationship synced', () => {
    const a = new Event(0.1);
    const b = new Event(0.1);

    const sampleSpace = new SampleSpace()
      .addEvent(a)
      .addEvent(b)
      .relate(a, binding => binding.exclusiveTo(b))
    
    expect(sampleSpace.getRelationship(a, b).type).toBe(sampleSpace.getRelationship(b, a).type);
  });
})
