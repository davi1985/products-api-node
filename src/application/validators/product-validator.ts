import type { CreateProductRequest } from "../dto/create-product-request.js";

export class ProductValidator {
  static validate(request: CreateProductRequest): void {
    const { name, price } = request;

    if (!name || typeof name !== "string") {
      throw new Error("Invalid product name");
    }

    if (typeof price !== "number" || price < 0) {
      throw new Error("Invalid product price");
    }
  }
}
