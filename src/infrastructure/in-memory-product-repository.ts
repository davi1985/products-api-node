import { Product } from "../domain/entities/product.js";
import { ProductId } from "../domain/value-objects/product-id.js";
import type { ProductRepository } from "../domain/repositories/product-repository.js";

export class InMemoryProductRepository implements ProductRepository {
  private products: Map<string, Product> = new Map();

  findAll(): Product[] {
    return Array.from(this.products.values());
  }

  findById(id: ProductId): Product | undefined {
    return this.products.get(id.value);
  }

  save(product: Product): void {
    this.products.set(product.id.value, product);
  }

  delete(id: ProductId): boolean {
    return this.products.delete(id.value);
  }

  clear(): void {
    this.products.clear();
  }
}
