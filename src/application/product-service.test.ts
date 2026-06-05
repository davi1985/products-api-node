import { describe, it, expect, beforeEach } from "vitest";
import { ProductService } from "./product-service.js";
import { InMemoryProductRepository } from "../infrastructure/in-memory-product-repository.js";
import { SortOptions } from "../domain/value-objects/sort-options.js";

describe("ProductService", () => {
  let repository: InMemoryProductRepository;
  let service: ProductService;

  beforeEach(() => {
    repository = new InMemoryProductRepository();
    service = new ProductService(repository);
  });

  describe("getAllProducts", () => {
    it("should return empty array when no products", () => {
      const sortOptions = SortOptions.create(undefined, undefined);
      const products = service.getAllProducts(sortOptions);

      expect(products).toEqual([]);
    });

    it("should return all products without sorting", () => {
      service.createProduct({ name: "Product A", price: 10 });
      service.createProduct({ name: "Product B", price: 20 });
      const sortOptions = SortOptions.create(undefined, undefined);

      const products = service.getAllProducts(sortOptions);

      expect(products).toHaveLength(2);
    });

    it("should sort products by name ascending", () => {
      service.createProduct({ name: "Zebra", price: 10 });
      service.createProduct({ name: "Apple", price: 20 });
      const sortOptions = SortOptions.create("name", "asc");

      const products = service.getAllProducts(sortOptions);

      expect(products[0]!.name).toBe("Apple");
      expect(products[1]!.name).toBe("Zebra");
    });

    it("should sort products by price descending", () => {
      service.createProduct({ name: "Cheap", price: 10 });
      service.createProduct({ name: "Expensive", price: 100 });
      const sortOptions = SortOptions.create("price", "desc");

      const products = service.getAllProducts(sortOptions);

      expect(products[0]!.price.amount).toBe(100);
      expect(products[1]!.price.amount).toBe(10);
    });
  });

  describe("getProductById", () => {
    it("should return undefined for non-existent product", () => {
      const product = service.getProductById({ id: "non-existent" });

      expect(product).toBeUndefined();
    });

    it("should return product by id", () => {
      const created = service.createProduct({ name: "Test", price: 50 });
      const found = service.getProductById({ id: created.id.value });

      expect(found).toBeDefined();
      expect(found?.name).toBe("Test");
    });
  });

  describe("createProduct", () => {
    it("should create a product with valid data", () => {
      const product = service.createProduct({
        name: "New Product",
        price: 99.99,
      });

      expect(product.name).toBe("New Product");
      expect(product.price.amount).toBe(99.99);
      expect(product.id).toBeDefined();
    });

    it("should throw error for invalid name", () => {
      expect(() => service.createProduct({ name: "", price: 10 })).toThrow();
    });

    it("should throw error for negative price", () => {
      expect(() =>
        service.createProduct({ name: "Test", price: -5 }),
      ).toThrow();
    });

    it("should persist the created product", () => {
      const created = service.createProduct({ name: "Persisted", price: 25 });
      const found = service.getProductById({ id: created.id.value });

      expect(found).toBeDefined();
      expect(found?.name).toBe("Persisted");
    });
  });

  describe("deleteProduct", () => {
    it("should return false when deleting non-existent product", () => {
      const result = service.deleteProduct({ id: "non-existent" });

      expect(result).toBe(false);
    });

    it("should return true and delete existing product", () => {
      const created = service.createProduct({ name: "To Delete", price: 10 });
      const result = service.deleteProduct({ id: created.id.value });
      const found = service.getProductById({ id: created.id.value });

      expect(result).toBe(true);
      expect(found).toBeUndefined();
    });
  });
});
