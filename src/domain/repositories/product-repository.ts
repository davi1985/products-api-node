import { Product } from "../entities/product.js";
import { ProductId } from "../value-objects/product-id.js";

export interface ProductRepository {
  findAll(): Product[];
  findById(id: ProductId): Product | undefined;
  save(product: Product): void;
  delete(id: ProductId): boolean;
}
