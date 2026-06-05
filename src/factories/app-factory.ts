import express, { type Express } from "express";
import { setupMiddleware } from "../middleware/setup-middleware.js";
import { createRoutes } from "../routes/index.js";
import { createServices } from "./service-factory.js";

export const createApp = (): Express => {
  const app = express();

  setupMiddleware(app);

  const { productController, healthController } = createServices();
  app.use(createRoutes(productController, healthController));

  return app;
};
