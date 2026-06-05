import { ProductId } from "../value-objects/product-id.js";
import { Money } from "../value-objects/money.js";

export class Product {
  constructor(
    private readonly _id: ProductId,
    private _name: string,
    private _price: Money,
  ) {}

  get id(): ProductId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): Money {
    return this._price;
  }

  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("Product name cannot be empty");
    }
    this._name = name;
  }

  updatePrice(price: Money): void {
    this._price = price;
  }

  toJSON() {
    return {
      id: this._id.value,
      name: this._name,
      price: this._price.amount,
    };
  }
}
