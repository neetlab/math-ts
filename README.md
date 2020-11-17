# math-ts

TypeScript implementation for mathematical concepts

## Features
### Implemented
- Equation
- Complex number
- Integer
- Probability (permutation, combination)
- Sequence / sigma
- Set
- Vector

### Todo
- Identity
- Function
- Calculus
- Line, circle equations
- Matrix
- Position vector

### REPL
MathTS contains enhanced Node.js REPL that is able to render LaTeX expressions by using ANSI escape sequence

![Screenshot](https://user-images.githubusercontent.com/19276905/99181743-da2c7100-2773-11eb-9c11-8f915f54bea3.png)


## Prove theorems
```
yarn run test
```

## API

### Complex

```ts
const a = new Complex(2, 1);
const b = a.getConjugate();
const c = new Complex(2, 1);

a.toString() === '2 + 1i';
a.equals(c) === true;
a.add(b).toInteger() === 4;
a.multiply(b).toInteger() === 5;
```

### Equation

```ts
// x^2 + x - 6 = 0
const p = new Equation([
  new Variable('x', 1, 2),
  new Variable('x', 1),
  new Constant(-6)
]);

p.test(new Map([['x', 2]]) === true;
p.test(new Map([['x', -3]]) === true;
```

### Integer

```ts
factorial(3) === 6;
gcd(36, 8) === 4;
```

### Permutation

```ts
permute([1, 2, 3], 2) // [1,2] [1,3] [2,1] [2,3]..
nPr(3,2) === 6
```

### Combination 

```ts
combine(new Set([ 1,2,3 ]), 2) // {1,2} {1,3} {2,3}
nCr(3,2) === 3
```

### Probability

```ts
let a = new Event(1 / 10), // P(A) = 1/10
    b = new Event(1 / 5),  // P(B) = 1/5
    c = new Event(1 / 3);  // P(C) = 1/3

let s = new SampleSpace([a, b, c])
  .relate(a, bind => bind.exclusiveTo(b));
  .relate(a, bind => bind.independentFrom(c))
  .relate(b, bind => bind.conditionalOn(c, new Event(1/2)));

// A and B are mutually exclusive <=> P(A∪B) = P(A) + P(B)
s.getUnion(a, b).probability === 1/10 + 1/5

// P_B(C) = 1/2 <=> P(B∩C)/P(B) = 1/2
s.getIntersection(b, c).probability / b.probability === 1/2

// You can invoke independent experiment w/ Math.random
a.experiment();
```

### Sequence

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

### Set

```ts
const s = new Set([1,2,3])
const t = new Set([1,2])

isSuperset(s, t) === true;
isSubset(t, s)   === true;

getUnion(s, t).equals(s);
getIntersection(s, t).equals(t);
getComplement(s, t) // {3}
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
