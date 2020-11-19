import { Equation } from "../equation";
import { Inequality, InequalityType } from "../inequality";
import { Function } from '../function';
import { Constant, Expression, Variable } from "../expression";

class ExpressionBuilder {
  constructor(
    private readonly expression = new Expression(),
  ) {}

  plus(variable: Variable): ExpressionBuilder
  plus(constant: Constant): ExpressionBuilder
  plus(factor: number, name: string | symbol, exponent?: number): ExpressionBuilder;
  plus(name: string | symbol, exponent?: number): ExpressionBuilder;
  plus(value: number): ExpressionBuilder 
  plus(first: any, second?: any, exponent?: number): ExpressionBuilder {
    if (first instanceof Variable) {
      return new ExpressionBuilder(
        this.expression.add(new Expression([ first ])),
      );
    }

    if (first instanceof Constant) {
      return new ExpressionBuilder(
        this.expression.add(new Expression([ first ])),
      );
    }

    if ((typeof first === 'string' || typeof first === 'symbol') && (typeof second === 'number' || typeof second === 'undefined')) {
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

  toFunction() {
    return new Function(this.expression);
  }

  get $() {
    return this.expression;
  }
}

const singleton = new ExpressionBuilder();
export const $ = singleton.plus.bind(singleton);
