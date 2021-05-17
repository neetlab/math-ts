import { Eq, Prod, Sum } from "src/_interfaces";

export class Matrix implements Eq<Matrix>, Sum<Matrix>, Prod<Matrix>, Prod<number, Matrix> {
  multiply(that: Matrix): Matrix
  multiply(that: number): Matrix
  multiply(that: Matrix | number): Matrix {
    if (typeof that === 'number') {
      return new Matrix(
        this.data.map((row) => row.map((v) => v * that))
      );
    }

    return new Matrix(
      this.data.map((row, rowI) => {
        return row.map((v, colI) => {
          return that.getNth(rowI, colI) * v;
        })
      })
    )
  }

  constructor(
    // row -> col
    private readonly data: number[][],
  ) {}

  getNth(row: number, col: number) {
    return this.data[row][col];
  }

  equals(that: Matrix) {
    return this.data.every((row, rowI) => {
      return row.every((v, colI) => {
        return that.getNth(rowI, colI) === v;
      });
    });
  }

  add(that: Matrix) {
    return new Matrix(
      this.data.map((row, rowI) => {
        return row.map((v, colI) => {
          return that.getNth(rowI, colI) + v;
        })
      })
    );
  }

}
