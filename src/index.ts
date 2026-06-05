import { createApp } from "./factories/app-factory.js";
import { AppConfig } from "./config/app-config.js";

const bootstrap = () => {
  const app = createApp();

  app.listen(AppConfig.port, () => {
    console.log(`Server is running on port http://localhost:${AppConfig.port}`);
  });

  return app;
};

bootstrap();
