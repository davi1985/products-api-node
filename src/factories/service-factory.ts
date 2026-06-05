import { InMemoryProductRepository } from "../infrastructure/in-memory-product-repository.js";
import { ProductService } from "../application/product-service.js";
import { ProductController } from "../controllers/product-controller.js";
import { HealthController } from "../controllers/health-controller.js";
import { createInitialProducts } from "./product-factory.js";

export type AppServices = {
  productController: ProductController;
  healthController: HealthController;
};

export const createServices = (): AppServices => {
  const productRepository = new InMemoryProductRepository();

  const initialProducts = createInitialProducts();
  initialProducts.forEach((product) => productRepository.save(product));

  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);
  const healthController = new HealthController();

  return {
    productController,
    healthController,
  };
};
