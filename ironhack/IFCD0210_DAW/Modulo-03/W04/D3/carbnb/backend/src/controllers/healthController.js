import { healthService } from "../services/healthService.js";

export const healthController = {
  async getHealth(req, res, next) {
    try {
      const healthData = await healthService.checkHealth();
      res.json(healthData);
    } catch (error) {
      next(error);
    }
  },
};
