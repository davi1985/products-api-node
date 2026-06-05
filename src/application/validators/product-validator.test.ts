import { describe, it, expect } from "vitest";
import { ProductValidator } from "./product-validator.js";

describe("ProductValidator", () => {
  it("should not throw for valid product data", () => {
    expect(() =>
      ProductValidator.validate({ name: "Valid Product", price: 29.99 })
    ).not.toThrow();
  });

  it("should throw for empty name", () => {
    expect(() =>
      ProductValidator.validate({ name: "", price: 10 })
    ).toThrow("Invalid product name");
  });

  it("should throw for non-string name", () => {
    expect(() =>
      ProductValidator.validate({ name: 123 as any, price: 10 })
    ).toThrow("Invalid product name");
  });

  it("should throw for negative price", () => {
    expect(() =>
      ProductValidator.validate({ name: "Test", price: -5 })
    ).toThrow("Invalid product price");
  });

  it("should throw for non-numeric price", () => {
    expect(() =>
      ProductValidator.validate({ name: "Test", price: "free" as any })
    ).toThrow("Invalid product price");
  });

  it("should accept zero as valid price", () => {
    expect(() =>
      ProductValidator.validate({ name: "Free Item", price: 0 })
    ).not.toThrow();
  });
});
