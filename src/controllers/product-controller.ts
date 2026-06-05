import { type Request, type Response } from "express";
import { SortOptions } from "../domain/value-objects/sort-options.js";
import type { ProductService } from "../application/product-service.js";
import {
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_MIN_PRICE,
  PRODUCT_MAX_PRICE,
} from "../config/validation-config.js";
import type {
  GetAllProductsRequest,
  GetProductByIdRequest,
  CreateProductControllerRequest,
  DeleteProductControllerRequest,
  ValidateSortOptionsRequest,
  SendErrorRequest,
  CreateProductBody,
} from "./types/controller-types.js";

export class ProductController {
  constructor(private readonly service: ProductService) {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  getAll({ request, response }: GetAllProductsRequest): void {
    const sortOptions = this.extractSortOptions(request);

    const validationRequest = { request, response, sortOptions };
    if (!this.isValidSortOptions(validationRequest)) return;

    const products = this.service.getAllProducts(sortOptions);
    response.json(products.map((product) => product.toJSON()));
  }

  private extractSortOptions(request: Request): SortOptions {
    const sort = request.query.sort;
    const order = request.query.order;

    const sortStr = typeof sort === "string" ? sort : undefined;
    const orderStr = typeof order === "string" ? order : undefined;

    return SortOptions.create(sortStr, orderStr);
  }

  private isValidSortOptions({
    request,
    response,
    sortOptions,
  }: ValidateSortOptionsRequest): boolean {
    const sort = request.query.sort;
    const order = request.query.order;
    const sortStr = typeof sort === "string" ? sort : undefined;
    const orderStr = typeof order === "string" ? order : undefined;

    if (sortStr !== undefined && !sortOptions.isSorting()) {
      return this.sendError({
        response,
        message: "Invalid sort parameter. Use 'name' or 'price'",
      });
    }

    if (orderStr !== undefined && sortOptions.order !== orderStr) {
      return this.sendError({
        response,
        message: "Invalid order parameter. Use 'asc' or 'desc'",
      });
    }

    return true;
  }

  private sendError({ response, message }: SendErrorRequest): false {
    response.status(400).json({ error: message });
    return false;
  }

  getById({ request, response }: GetProductByIdRequest): void {
    const getByIdRequest = { id: String(request.params.id) };
    const product = this.service.getProductById(getByIdRequest);

    if (!product) {
      response.status(404).json({ error: "Product not found" });
      return;
    }

    response.json(product.toJSON());
  }

  create({ request, response }: CreateProductControllerRequest): void {
    const createRequest = this.extractCreateRequest(request);

    if (!createRequest) {
      response.status(400).json({ error: "Invalid product data" });
      return;
    }

    try {
      const product = this.service.createProduct(createRequest);
      response.status(201).json(product.toJSON());
    } catch (error) {
      const isValidationError =
        error instanceof Error &&
        (error.message.includes("Invalid") ||
          error.message.includes("required"));

      const message = isValidationError
        ? error.message
        : "Failed to create product";

      response.status(400).json({ error: message });
    }
  }

  private extractCreateRequest(
    request: Request,
  ): CreateProductBody | undefined {
    const { name, price } = request.body;

    if (typeof name !== "string" || typeof price !== "number") {
      return undefined;
    }

    const trimmedName = name.trim();
    if (
      trimmedName.length < PRODUCT_NAME_MIN_LENGTH ||
      trimmedName.length > PRODUCT_NAME_MAX_LENGTH
    ) {
      return undefined;
    }

    if (price < PRODUCT_MIN_PRICE || price > PRODUCT_MAX_PRICE) {
      return undefined;
    }

    return { name: trimmedName, price };
  }

  delete({ request, response }: DeleteProductControllerRequest): void {
    const id = String(request.params.id);
    const deleteRequest = { id };
    const deleted = this.service.deleteProduct(deleteRequest);

    if (!deleted) {
      response.status(404).json({ error: "Product not found" });
      return;
    }

    response.status(204).send();
  }
}
