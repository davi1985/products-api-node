export class Money {
  private readonly _amount: number;

  constructor(amount: number) {
    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }
    this._amount = amount;
  }

  get amount(): number {
    return this._amount;
  }

  lessThan(other: Money): boolean {
    return this._amount < other._amount;
  }

  greaterThan(other: Money): boolean {
    return this._amount > other._amount;
  }

  equals(other: Money): boolean {
    return this._amount === other._amount;
  }

  format(): string {
    return this._amount.toFixed(2);
  }
}
