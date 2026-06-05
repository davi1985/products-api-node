import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Products API",
      version: "1.0.0",
      description: "A RESTful API for managing products with SOLID architecture",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Health check endpoints",
      },
      {
        name: "Products",
        description: "Product management endpoints",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            name: {
              type: "string",
              description: "Product name",
              example: "Wireless Mouse",
            },
            price: {
              type: "number",
              description: "Product price in dollars",
              example: 29.99,
            },
          },
          required: ["id", "name", "price"],
        },
        CreateProductRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Product name",
              example: "Wireless Mouse",
            },
            price: {
              type: "number",
              description: "Product price in dollars",
              example: 29.99,
            },
          },
          required: ["name", "price"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
              example: "Product not found",
            },
          },
          required: ["error"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
