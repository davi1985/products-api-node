import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../factories/app-factory.js";
import type { Express } from "express";

describe("ProductController Integration Tests", () => {
  let app: Express;

  beforeEach(() => {
    app = createApp();
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: "ok" });
    });
  });

  describe("GET /products", () => {
    it("should return list of products", async () => {
      const response = await request(app).get("/products");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should sort products by name", async () => {
      // Create products with distinctive names
      await request(app)
        .post("/products")
        .send({ name: "ZZZ_Last", price: 10 });
      await request(app)
        .post("/products")
        .send({ name: "AAA_First", price: 20 });

      const response = await request(app)
        .get("/products")
        .query({ sort: "name", order: "asc" });

      expect(response.status).toBe(200);

      // Find our created products in the sorted list
      const productNames = response.body.map((p: { name: string }) => p.name);
      const aaaIndex = productNames.indexOf("AAA_First");
      const zzzIndex = productNames.indexOf("ZZZ_Last");

      // AAA should come before ZZZ
      expect(aaaIndex).toBeLessThan(zzzIndex);
    });

    it("should return 400 for invalid sort parameter", async () => {
      const response = await request(app)
        .get("/products")
        .query({ sort: "invalid" });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("Invalid sort");
    });

    it("should return 400 for invalid order parameter", async () => {
      const response = await request(app)
        .get("/products")
        .query({ sort: "name", order: "invalid" });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("Invalid order");
    });
  });

  describe("GET /products/:id", () => {
    it("should return product by id", async () => {
      const createResponse = await request(app)
        .post("/products")
        .send({ name: "Test Product", price: 29.99 });

      const productId = createResponse.body.id;
      const response = await request(app).get(`/products/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Test Product");
      expect(response.body.price).toBe(29.99);
    });

    it("should return 404 for non-existent product", async () => {
      const response = await request(app).get("/products/non-existent-id");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Product not found");
    });
  });

  describe("POST /products", () => {
    it("should create a new product", async () => {
      const response = await request(app)
        .post("/products")
        .send({ name: "New Product", price: 49.99 });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.name).toBe("New Product");
      expect(response.body.price).toBe(49.99);
    });

    it("should return 400 for empty name", async () => {
      const response = await request(app)
        .post("/products")
        .send({ name: "", price: 10 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it("should return 400 for negative price", async () => {
      const response = await request(app)
        .post("/products")
        .send({ name: "Test", price: -5 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it("should return 400 for price exceeding maximum", async () => {
      const response = await request(app)
        .post("/products")
        .send({ name: "Too Expensive", price: 1000000 }); // Above max

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it("should return 400 for missing fields", async () => {
      const response = await request(app)
        .post("/products")
        .send({ name: "Only Name" });

      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /products/:id", () => {
    it("should delete existing product", async () => {
      const createResponse = await request(app)
        .post("/products")
        .send({ name: "To Delete", price: 10 });

      const productId = createResponse.body.id;
      const deleteResponse = await request(app).delete(
        `/products/${productId}`,
      );

      expect(deleteResponse.status).toBe(204);

      // Verify it's gone
      const getResponse = await request(app).get(`/products/${productId}`);
      expect(getResponse.status).toBe(404);
    });

    it("should return 404 for non-existent product", async () => {
      const response = await request(app).delete("/products/non-existent-id");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Product not found");
    });
  });

  describe("Rate limiting", () => {
    it("should return 429 when rate limit exceeded", async () => {
      // Make many requests quickly to trigger rate limit
      const requests = Array(101)
        .fill(null)
        .map(() => request(app).get("/health"));

      const responses = await Promise.all(requests);
      const tooManyRequests = responses.filter((r) => r.status === 429);

      expect(tooManyRequests.length).toBeGreaterThan(0);
    });
  });
});
