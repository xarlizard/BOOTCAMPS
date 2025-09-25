import { Router } from "express";
import { itemController } from "../controllers/itemController.js";

const router = Router();

// GET /api/items - List items with search and pagination
router.get("/", itemController.getItems);

// POST /api/items - Create new item
router.post("/", itemController.createItem);

// GET /api/items/:id - Get item by ID
router.get("/:id", itemController.getItemById);

// PUT /api/items/:id - Update item
router.put("/:id", itemController.updateItem);

// DELETE /api/items/:id - Delete item
router.delete("/:id", itemController.deleteItem);

export default router;
