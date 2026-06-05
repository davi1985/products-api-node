import { describe, it, expect } from "vitest";
import { ProductId } from "./product-id.js";

describe("ProductId", () => {
  it("should create a valid ProductId with UUID", () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";
    const productId = new ProductId(uuid);

    expect(productId.value).toBe(uuid);
  });

  it("should accept any non-empty string as ID", () => {
    const productId = new ProductId("any-non-empty-string");
    expect(productId.value).toBe("any-non-empty-string");
  });

  it("should throw error for empty string", () => {
    expect(() => new ProductId("")).toThrow();
  });

  it("should be equal to another ProductId with same value", () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";
    const id1 = new ProductId(uuid);
    const id2 = new ProductId(uuid);

    expect(id1.equals(id2)).toBe(true);
  });

  it("should not be equal to another ProductId with different value", () => {
    const id1 = new ProductId("550e8400-e29b-41d4-a716-446655440000");
    const id2 = new ProductId("550e8400-e29b-41d4-a716-446655440001");

    expect(id1.equals(id2)).toBe(false);
  });
});
