import { Equation } from "../equation";
import { Inequality, InequalityType } from "../inequality";
import { Constant, Expression, Variable } from "../expression";

class ExpressionBuilder {
  constructor(
    private readonly expression = new Expression(),
  ) {}

  plus(factor: number, name: string | symbol, exponent?: number): ExpressionBuilder;
  plus(name: string | symbol, exponent?: number): ExpressionBuilder;
  plus(value: number): ExpressionBuilder 
  plus(first: number | string | symbol, second?: string | symbol | number, exponent?: number): ExpressionBuilder {
    if ((typeof first === 'string' || typeof first === 'symbol') && typeof second === 'number') {
      const name = first;
      const factor = second;

      return new ExpressionBuilder(
        this.expression.add(new Expression([ new Variable(name, factor, exponent) ])),
      );
    }

    if (typeof first === 'number' && (typeof second === 'string' || typeof second === 'symbol')) {
      const factor = first;
      const name = second;

      return new ExpressionBuilder(
        this.expression.add(new Expression([ new Variable(name, factor, exponent) ])),
      );
    }

    if (typeof first === 'number' && typeof second === 'undefined') {
      return new ExpressionBuilder(
        this.expression.add(new Expression([ new Constant(first) ])),
      );
    }

    throw new TypeError();
  }

  isEqualTo(that: ExpressionBuilder) {
    return new Equation(
      this.expression,
      that.expression,
    );
  }

  isGreaterThan(that: ExpressionBuilder) {
    return new Inequality(
      InequalityType.GT,
      this.expression,
      that.expression,
    );
  }

  isLessThan(that: ExpressionBuilder) {
    return new Inequality(
      InequalityType.LT,
      this.expression,
      that.expression,
    );
  }

  isGreaterThanOrEqualTo(that: ExpressionBuilder) {
    return new Inequality(
      InequalityType.LTE,
      this.expression,
      that.expression,
    );
  }

  isLessThanOrEqualTo(that: ExpressionBuilder) {
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

const singleton = new ExpressionBuilder();
export const $ = singleton.plus.bind(singleton);
