import { type Request, type Response } from "express";
import { SortOptions } from "../../domain/value-objects/sort-options.js";

export type GetAllProductsRequest = {
  request: Request;
  response: Response;
};

export type GetProductByIdRequest = {
  request: Request;
  response: Response;
};

export type CreateProductControllerRequest = {
  request: Request;
  response: Response;
};

export type DeleteProductControllerRequest = {
  request: Request;
  response: Response;
};

export type ValidateSortOptionsRequest = {
  request: Request;
  response: Response;
  sortOptions: SortOptions;
};

export type SendErrorRequest = {
  response: Response;
  message: string;
};

export type CreateProductBody = {
  name: string;
  price: number;
};
