import { Equation } from "../equation";
import { Inequality, InequalityType } from "../inequality";
import { Constant, Expression, Variable } from "../expression";

class ExpressionFactory {
  constructor(
    private readonly expression = new Expression(),
  ) {}

  plus(factor: number, name: string | symbol, exponent?: number): ExpressionFactory;
  plus(name: string | symbol, exponent?: number): ExpressionFactory;
  plus(value: number): ExpressionFactory
  plus(first: number | string | symbol, second?: string | symbol | number, exponent?: number): ExpressionFactory {
    if ((typeof first === 'string' || typeof first === 'symbol') && typeof second === 'number') {
      const name = first;
      const factor = second;

      return new ExpressionFactory(
        this.expression.add(new Expression([ new Variable(name, factor, exponent) ])),
      );
    }

    if (typeof first === 'number' && (typeof second === 'string' || typeof second === 'symbol')) {
      const factor = first;
      const name = second;

      return new ExpressionFactory(
        this.expression.add(new Expression([ new Variable(name, factor, exponent) ])),
      );
    }

    if (typeof first === 'number' && typeof second === 'undefined') {
      return new ExpressionFactory(
        this.expression.add(new Expression([ new Constant(first) ])),
      );
    }

    throw new TypeError();
  }

  isEqualTo(that: ExpressionFactory) {
    return new Equation(
      this.expression,
      that.expression,
    );
  }

  isGreaterThan(that: ExpressionFactory) {
    return new Inequality(
      InequalityType.GT,
      this.expression,
      that.expression,
    );
  }

  isLessThan(that: ExpressionFactory) {
    return new Inequality(
      InequalityType.LT,
      this.expression,
      that.expression,
    );
  }

  isGreaterThanOrEqualTo(that: ExpressionFactory) {
    return new Inequality(
      InequalityType.LTE,
      this.expression,
      that.expression,
    );
  }

  isLessThanOrEqualTo(that: ExpressionFactory) {
    return new Inequality(
      InequalityType.LTE,
      this.expression,
      that.expression,
    );
  }

  get $() {
    return this.expression;
  }
}

const singleton = new ExpressionFactory();
export const $ = singleton.plus.bind(singleton);
