export class ProductId {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Product ID cannot be empty");
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  equals(other: ProductId): boolean {
    return this._value === other.value;
  }

  toString(): string {
    return this._value;
  }
}
