import { type Request, type Response } from "express";

export type CreateHealthCheckRequest = {
  request: Request;
  response: Response;
};
