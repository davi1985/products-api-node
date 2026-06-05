import { describe, it, expect } from "vitest";
import { Product } from "./product.js";
import { ProductId } from "../value-objects/product-id.js";
import { Money } from "../value-objects/money.js";

describe("Product", () => {
  it("should create a product with initial values", () => {
    const id = new ProductId("550e8400-e29b-41d4-a716-446655440000");
    const price = new Money(29.99);
    const product = new Product(id, "Test Product", price);

    expect(product.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(product.name).toBe("Test Product");
    expect(product.price.amount).toBe(29.99);
  });

  describe("updateName", () => {
    it("should update the product name", () => {
      const product = new Product(
        new ProductId("1"),
        "Original Name",
        new Money(10)
      );

      product.updateName("New Name");

      expect(product.name).toBe("New Name");
    });

    it("should throw error for empty name", () => {
      const product = new Product(
        new ProductId("1"),
        "Original",
        new Money(10)
      );

      expect(() => product.updateName("")).toThrow("Product name cannot be empty");
    });

    it("should throw error for whitespace-only name", () => {
      const product = new Product(
        new ProductId("1"),
        "Original",
        new Money(10)
      );

      expect(() => product.updateName("   ")).toThrow("Product name cannot be empty");
    });
  });

  describe("updatePrice", () => {
    it("should update the product price", () => {
      const product = new Product(
        new ProductId("1"),
        "Test",
        new Money(10)
      );

      product.updatePrice(new Money(25.5));

      expect(product.price.amount).toBe(25.5);
    });
  });

  describe("toJSON", () => {
    it("should return plain object representation", () => {
      const product = new Product(
        new ProductId("550e8400-e29b-41d4-a716-446655440000"),
        "JSON Test",
        new Money(99.99)
      );

      const json = product.toJSON();

      expect(json).toEqual({
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "JSON Test",
        price: 99.99,
      });
    });
  });
});
