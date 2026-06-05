import express, { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import { setupMiddleware } from "../middleware/setup-middleware.js";
import { createRoutes } from "../routes/index.js";
import { createServices } from "./service-factory.js";
import { swaggerSpec } from "../config/swagger-config.js";

export const createApp = (): Express => {
  const app = express();

  setupMiddleware(app);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  const { productController, healthController } = createServices();
  app.use(createRoutes(productController, healthController));

  return app;
};
