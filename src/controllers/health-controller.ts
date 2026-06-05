import { type Response } from "express";
import type { CreateHealthCheckRequest } from "./types/health-controller-types.js";

export class HealthController {
  constructor() {
    this.check = this.check.bind(this);
  }

  check({ response }: CreateHealthCheckRequest): void {
    response.json({ status: "ok" });
  }
}
