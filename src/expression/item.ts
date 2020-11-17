export interface Item {
  readonly name: symbol | string;
  isNegativeFactor(): boolean;
}
