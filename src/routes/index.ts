import { Router } from "express";
import type { ProductController } from "../controllers/product-controller.js";
import type { HealthController } from "../controllers/health-controller.js";

export const createRoutes = (
  productController: ProductController,
  healthController: HealthController,
): Router => {
  const router = Router();

  router.get("/health", (req, res) =>
    healthController.check({ request: req, response: res }),
  );
  router.get("/products", (req, res) =>
    productController.getAll({ request: req, response: res }),
  );
  router.get("/products/:id", (req, res) =>
    productController.getById({ request: req, response: res }),
  );
  router.post("/products", (req, res) =>
    productController.create({ request: req, response: res }),
  );
  router.delete("/products/:id", (req, res) =>
    productController.delete({ request: req, response: res }),
  );

  return router;
};
