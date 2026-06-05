import { Product } from "../domain/entities/product.js";
import { ProductId } from "../domain/value-objects/product-id.js";
import { Money } from "../domain/value-objects/money.js";

export const createInitialProducts = (): Product[] => [
  new Product(new ProductId("1"), "Product A", new Money(10.99)),
  new Product(new ProductId("2"), "Product B", new Money(19.99)),
  new Product(new ProductId("3"), "Product C", new Money(5.99)),
];
