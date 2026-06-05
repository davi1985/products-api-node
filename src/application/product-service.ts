import { randomUUID } from "node:crypto";
import { Product } from "../domain/entities/product.js";
import { ProductId } from "../domain/value-objects/product-id.js";
import { Money } from "../domain/value-objects/money.js";
import { SortOptions } from "../domain/value-objects/sort-options.js";
import { ProductSorter } from "../domain/sorters/product-sorter.js";
import type { ProductRepository } from "../domain/repositories/product-repository.js";
import type { CreateProductRequest } from "./dto/create-product-request.js";
import type { GetProductByIdRequest } from "./dto/get-product-by-id-request.js";
import type { DeleteProductRequest } from "./dto/delete-product-request.js";
import { ProductValidator } from "./validators/product-validator.js";

export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  getAllProducts(sortOptions: SortOptions): Product[] {
    const products = this.repository.findAll();

    if (!sortOptions.isSorting()) {
      return products;
    }

    const sortRequest = {
      field: sortOptions.field!,
      order: sortOptions.order,
    };
    return ProductSorter.sort(products, sortRequest);
  }

  getProductById(request: GetProductByIdRequest): Product | undefined {
    const productId = new ProductId(request.id);
    return this.repository.findById(productId);
  }

  createProduct(request: CreateProductRequest): Product {
    ProductValidator.validate(request);

    const product = new Product(
      new ProductId(randomUUID()),
      request.name,
      new Money(request.price),
    );

    this.repository.save(product);

    return product;
  }

  deleteProduct(request: DeleteProductRequest): boolean {
    const productId = new ProductId(request.id);
    return this.repository.delete(productId);
  }
}
