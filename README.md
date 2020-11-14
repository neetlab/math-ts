# math-ts

TypeScript implementation for mathematical concepts

## Implemented
- Equation
- Complex number
- Integer
- Probability (permutation, combination)
- Sequence / sigma
- Set
- Vector

## Prove theorems
```
yarn run test
```

## API

### `Complex`

```ts
const a = new Complex(2, 1);
const b = a.getConjugate();
const c = new Complex(2, 1);

a.toString() === '2 + 1i';
a.equals(c) === true;
a.add(b).toInteger() === 4;
a.multiply(b).toInteger() === 5;
```

### `Equation`

```ts
// x^2 + x - 6 = 0
const Px = new Equation([
  new Variable('x', 1, 2),
  new Variable('x', 1),
  new Constant(-6)
]);

equation.test(new Map([['x', 2]]) === true;
equation.test(new Map([['x', -3]]) === true;
```

### `Integer`

```ts
factorial(3) === 6;
gcd(36, 8) === 4;
```

### `Probability`

```ts
permute([1, 2, 3], 2) // [1,2] [1,3] [2,1] [2,3]..
combine(new Set([1,2,3]), 2) // {1,2} {1,3} {2,3}
nPr(3,2) === 6
nCr(3,2) === 3
```

### `Sequence`

```ts
// a = 1, d = 2, n = 10
const s1 = new ArithmeticSequence(1, 2, 10);
s1.getNth(5) === 11;
s1.getSum()  === 100;

// a = 1, r = 2, n = 10
const s2 = new GeometricSequence(1, 2, 10);
s2.getNth(4) === 16;
s2.getSum()  === 1024;
```

### `Set`

```ts
const S = new Set([1,2,3])
const T = new Set([1,2])

isSuperset(S, U) === true;
isSubset(U, S)   === true;

getUnion(S, T).equals(S);
getIntersection(S, T).equals(T);
getComplement(S, T) // {3}
```

### Vector

```ts
const a = new Vector(1, 0, 0);
const b = new Vector(1, 1, 0);
const p = new Vector(4, 2, 0);

a.multiply(2).add(b.multiply(2)).equals(p);
a.getAngle(b) === Math.PI / 2;
a.dotProd(a) === a.norm ** 2;
```

## License
MIT
