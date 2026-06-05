import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProductRepository } from "./in-memory-product-repository.js";
import { Product } from "../domain/entities/product.js";
import { ProductId } from "../domain/value-objects/product-id.js";
import { Money } from "../domain/value-objects/money.js";

describe("InMemoryProductRepository", () => {
  let repository: InMemoryProductRepository;

  beforeEach(() => {
    repository = new InMemoryProductRepository();
  });

  describe("save", () => {
    it("should save a product", () => {
      const product = new Product(
        new ProductId("550e8400-e29b-41d4-a716-446655440000"),
        "Test Product",
        new Money(29.99)
      );

      repository.save(product);
      const found = repository.findById(product.id);

      expect(found).toBeDefined();
      expect(found?.name).toBe("Test Product");
    });

    it("should update existing product", () => {
      const id = new ProductId("550e8400-e29b-41d4-a716-446655440000");
      const product1 = new Product(id, "Original", new Money(10));
      const product2 = new Product(id, "Updated", new Money(20));

      repository.save(product1);
      repository.save(product2);
      const found = repository.findById(id);

      expect(found?.name).toBe("Updated");
    });
  });

  describe("findById", () => {
    it("should return undefined for non-existent product", () => {
      const found = repository.findById(new ProductId("non-existent"));

      expect(found).toBeUndefined();
    });
  });

  describe("findAll", () => {
    it("should return empty array when no products", () => {
      const products = repository.findAll();

      expect(products).toEqual([]);
    });

    it("should return all saved products", () => {
      repository.save(new Product(new ProductId("1"), "A", new Money(10)));
      repository.save(new Product(new ProductId("2"), "B", new Money(20)));

      const products = repository.findAll();

      expect(products).toHaveLength(2);
    });
  });

  describe("delete", () => {
    it("should return false when deleting non-existent product", () => {
      const result = repository.delete(new ProductId("non-existent"));

      expect(result).toBe(false);
    });

    it("should return true and delete existing product", () => {
      const id = new ProductId("550e8400-e29b-41d4-a716-446655440000");
      repository.save(new Product(id, "To Delete", new Money(10)));

      const result = repository.delete(id);
      const found = repository.findById(id);

      expect(result).toBe(true);
      expect(found).toBeUndefined();
    });
  });

  describe("clear", () => {
    it("should remove all products", () => {
      repository.save(new Product(new ProductId("1"), "A", new Money(10)));
      repository.save(new Product(new ProductId("2"), "B", new Money(20)));

      repository.clear();
      const products = repository.findAll();

      expect(products).toEqual([]);
    });
  });
});
