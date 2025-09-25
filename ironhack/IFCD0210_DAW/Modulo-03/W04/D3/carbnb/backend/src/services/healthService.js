import prisma from "./database.js";

export const healthService = {
  async checkHealth() {
    try {
      // Test database connection
      await prisma.$queryRaw`SELECT 1`;

      return {
        status: "ok",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        database: {
          status: "connected",
          type: "sqlite",
        },
        uptime: process.uptime(),
      };
    } catch (error) {
      return {
        status: "error",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        database: {
          status: "disconnected",
          type: "sqlite",
          error: error.message,
        },
        uptime: process.uptime(),
      };
    }
  },
};
