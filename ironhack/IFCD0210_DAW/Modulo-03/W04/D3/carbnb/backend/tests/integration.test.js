import request from "supertest";
import app from "../src/index.js";
import prisma from "../src/services/database.js";

describe("CarBnB API Integration Tests", () => {
  let testItemId;

  beforeAll(async () => {
    // Clean up test data
    await prisma.item.deleteMany();
  });

  afterAll(async () => {
    // Clean up after tests
    await prisma.item.deleteMany();
    await prisma.$disconnect();
  });

  describe("Health Endpoint", () => {
    test("GET /api/health should return system health", async () => {
      const response = await request(app).get("/api/health").expect(200);

      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("version");
      expect(response.body).toHaveProperty("database");
      expect(response.body.status).toBe("ok");
    });
  });

  describe("Items CRUD Operations", () => {
    const testItem = {
      title: "Test Car BMW X5",
      description: "Test description for integration testing",
      tags: ["test", "bmw", "suv"],
    };

    test("POST /api/items should create a new item", async () => {
      const response = await request(app)
        .post("/api/items")
        .send(testItem)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body.title).toBe(testItem.title);
      expect(response.body.description).toBe(testItem.description);
      expect(response.body.tags).toEqual(testItem.tags);
      expect(response.body).toHaveProperty("createdAt");
      expect(response.body).toHaveProperty("updatedAt");

      testItemId = response.body.id;
    });

    test("POST /api/items should validate required fields", async () => {
      const response = await request(app)
        .post("/api/items")
        .send({ description: "Missing title" })
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body.message).toContain("required");
    });

    test("GET /api/items should return list of items", async () => {
      const response = await request(app).get("/api/items").expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("meta");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.meta).toHaveProperty("total");
      expect(response.body.meta).toHaveProperty("page");
      expect(response.body.meta).toHaveProperty("pageSize");
    });

    test("GET /api/items with search should filter results", async () => {
      const response = await request(app)
        .get("/api/items?search=BMW")
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      const foundItem = response.body.data.find((item) =>
        item.title.includes("BMW")
      );
      expect(foundItem).toBeTruthy();
    });

    test("GET /api/items with pagination should work", async () => {
      const response = await request(app)
        .get("/api/items?page=1&pageSize=5")
        .expect(200);

      expect(response.body.meta.page).toBe(1);
      expect(response.body.meta.pageSize).toBe(5);
      expect(response.body.data.length).toBeLessThanOrEqual(5);
    });

    test("GET /api/items/:id should return specific item", async () => {
      const response = await request(app)
        .get(`/api/items/${testItemId}`)
        .expect(200);

      expect(response.body.id).toBe(testItemId);
      expect(response.body.title).toBe(testItem.title);
      expect(response.body.tags).toEqual(testItem.tags);
    });

    test("GET /api/items/:id should return 404 for non-existent item", async () => {
      const response = await request(app).get("/api/items/99999").expect(404);

      expect(response.body).toHaveProperty("error");
    });

    test("PUT /api/items/:id should update existing item", async () => {
      const updatedData = {
        title: "Updated Test Car BMW X5",
        description: "Updated description",
        tags: ["updated", "bmw", "luxury"],
      };

      const response = await request(app)
        .put(`/api/items/${testItemId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.id).toBe(testItemId);
      expect(response.body.title).toBe(updatedData.title);
      expect(response.body.description).toBe(updatedData.description);
      expect(response.body.tags).toEqual(updatedData.tags);
    });

    test("PUT /api/items/:id should validate required fields", async () => {
      const response = await request(app)
        .put(`/api/items/${testItemId}`)
        .send({ description: "Missing title" })
        .expect(400);

      expect(response.body).toHaveProperty("error");
    });

    test("PUT /api/items/:id should return 404 for non-existent item", async () => {
      const response = await request(app)
        .put("/api/items/99999")
        .send(testItem)
        .expect(404);

      expect(response.body).toHaveProperty("error");
    });

    test("DELETE /api/items/:id should remove item", async () => {
      await request(app).delete(`/api/items/${testItemId}`).expect(204);

      // Verify item is deleted
      await request(app).get(`/api/items/${testItemId}`).expect(404);
    });

    test("DELETE /api/items/:id should return 404 for non-existent item", async () => {
      const response = await request(app)
        .delete("/api/items/99999")
        .expect(404);

      expect(response.body).toHaveProperty("error");
    });
  });

  describe("Error Handling", () => {
    test("Should handle invalid JSON", async () => {
      const response = await request(app)
        .post("/api/items")
        .set("Content-Type", "application/json")
        .send("invalid json")
        .expect(400);

      expect(response.body).toHaveProperty("error");
    });

    test("Should handle non-existent routes", async () => {
      const response = await request(app).get("/api/nonexistent").expect(404);

      expect(response.body).toHaveProperty("error");
      expect(response.body.message).toContain("not found");
    });
  });

  describe("Input Validation", () => {
    test("Should reject items with invalid data types", async () => {
      const invalidItem = {
        title: 123, // Should be string
        description: true, // Should be string
        tags: "not-an-array", // Should be array
      };

      const response = await request(app)
        .post("/api/items")
        .send(invalidItem)
        .expect(400);

      expect(response.body).toHaveProperty("error");
    });

    test("Should reject items with too many tags", async () => {
      const itemWithManyTags = {
        title: "Test Car",
        tags: Array.from({ length: 15 }, (_, i) => `tag${i}`),
      };

      const response = await request(app)
        .post("/api/items")
        .send(itemWithManyTags)
        .expect(400);

      expect(response.body.message).toContain("Maximum 10 tags");
    });

    test("Should reject items with too long title", async () => {
      const itemWithLongTitle = {
        title: "a".repeat(250),
        description: "Test description",
      };

      const response = await request(app)
        .post("/api/items")
        .send(itemWithLongTitle)
        .expect(400);

      expect(response.body.message).toContain("200 characters");
    });
  });
});
