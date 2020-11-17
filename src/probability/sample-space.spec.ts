import { Event } from './event';
import { SampleSpace } from './sample-space';

describe('Event', () => {
  it('returns always true when P(A) = 1', () => {
    const a = new Event(1);
    const { result } = new SampleSpace([a]).experiment(a);
    expect(result).toBe(true);
  });

  it('returns always false when P(A) = 0', () => {
    const a = new Event(0);
    const { result } = new SampleSpace([a]).experiment(a);
    expect(result).toBe(false);
  });

  test('nCr*p^r*(1-p)^(n-r)', () => {
    const p = new Event(0.5)
    const sampleSpace = new SampleSpace([p]);
    const repeatedP = sampleSpace.independentRepeat(p, 10, 5) 
    expect(repeatedP.probability).toBe(0.24609375);
  });

  test('relationship synced', () => {
    const a = new Event(0.1);
    const b = new Event(0.1);

    const s = new SampleSpace([a, b])
      .relate(a, binding => binding.exclusiveTo(b))
    
    expect(s.getRelationship(a, b).type).toBe(s.getRelationship(b, a).type);
  });

  test('A and B are mutually exclusive <=> P(A∩B) = P(A) + P(B)', () => {
    const a = new Event(1 / 10);
    const b = new Event(1 / 5);

    const s = new SampleSpace([a, b])
      .relate(a, bind => bind.exclusiveTo(b));

    expect(s.getUnion(a, b).probability).toBe(1/10 + 1/5);
  });

  test('A and B are mutually exclusive <=>  P(A∩B) = 0', () => {
    const a = new Event(1 / 10);
    const b = new Event(1 / 5);

    const s = new SampleSpace([a, b])
      .relate(a, bind => bind.exclusiveTo(b));

    expect(s.getIntersection(a, b).probability).toBe(0);
  });

  test('P_A(B) = 1/2 <=> P(A∩B)/P(A) = 1/2', () => {
    const a = new Event(1 / 5);
    const b = new Event(1 / 3);

    const s = new SampleSpace([a, b])
      .relate(a, bind => bind
        .conditionalOn(b, new Event(1/2))
      );

    expect(s.getIntersection(a, b).probability / a.probability).toBe(1/2);
  });
})
