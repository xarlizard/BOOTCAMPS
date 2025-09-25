import prisma from "./database.js";

export const itemService = {
  async getItems({ search = "", page = 1, pageSize = 10 }) {
    const skip = (page - 1) * pageSize;
    const take = Math.min(pageSize, 100); // Limit max page size

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { tags: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // Get total count for pagination
    const total = await prisma.item.count({ where });

    // Get items
    const items = await prisma.item.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    // Parse tags from JSON string
    const itemsWithParsedTags = items.map((item) => ({
      ...item,
      tags: JSON.parse(item.tags || "[]"),
    }));

    return {
      data: itemsWithParsedTags,
      meta: {
        page: Number(page),
        pageSize: Number(pageSize),
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  },

  async getItemById(id) {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }

    return {
      ...item,
      tags: JSON.parse(item.tags || "[]"),
    };
  },

  async createItem(data) {
    const { title, description, tags = [] } = data;

    const item = await prisma.item.create({
      data: {
        title,
        description: description || null,
        tags: JSON.stringify(tags),
      },
    });

    return {
      ...item,
      tags: JSON.parse(item.tags || "[]"),
    };
  },

  async updateItem(id, data) {
    const { title, description, tags = [] } = data;

    try {
      const item = await prisma.item.update({
        where: { id: Number(id) },
        data: {
          title,
          description: description || null,
          tags: JSON.stringify(tags),
        },
      });

      return {
        ...item,
        tags: JSON.parse(item.tags || "[]"),
      };
    } catch (error) {
      if (error.code === "P2025") {
        const notFoundError = new Error("Item not found");
        notFoundError.status = 404;
        throw notFoundError;
      }
      throw error;
    }
  },

  async deleteItem(id) {
    try {
      await prisma.item.delete({
        where: { id: Number(id) },
      });
      return { message: "Item deleted successfully" };
    } catch (error) {
      if (error.code === "P2025") {
        const notFoundError = new Error("Item not found");
        notFoundError.status = 404;
        throw notFoundError;
      }
      throw error;
    }
  },
};
