import { itemService } from "../services/itemService.js";
import { itemValidation } from "../services/validation.js";

export const itemController = {
  async getItems(req, res, next) {
    try {
      // Validate query parameters
      const { error, value } = itemValidation.query.validate(req.query);
      if (error) {
        return res.status(400).json({
          error: "Validation Error",
          message: error.details[0].message,
        });
      }

      const result = await itemService.getItems(value);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getItemById(req, res, next) {
    try {
      // Validate ID parameter
      const { error, value } = itemValidation.id.validate({
        id: req.params.id,
      });
      if (error) {
        return res.status(400).json({
          error: "Validation Error",
          message: error.details[0].message,
        });
      }

      const item = await itemService.getItemById(value.id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  async createItem(req, res, next) {
    try {
      // Validate request body
      const { error, value } = itemValidation.create.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: "Validation Error",
          message: error.details[0].message,
        });
      }

      const item = await itemService.createItem(value);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },

  async updateItem(req, res, next) {
    try {
      // Validate ID parameter
      const idValidation = itemValidation.id.validate({ id: req.params.id });
      if (idValidation.error) {
        return res.status(400).json({
          error: "Validation Error",
          message: idValidation.error.details[0].message,
        });
      }

      // Validate request body
      const { error, value } = itemValidation.update.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: "Validation Error",
          message: error.details[0].message,
        });
      }

      const item = await itemService.updateItem(idValidation.value.id, value);
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  async deleteItem(req, res, next) {
    try {
      // Validate ID parameter
      const { error, value } = itemValidation.id.validate({
        id: req.params.id,
      });
      if (error) {
        return res.status(400).json({
          error: "Validation Error",
          message: error.details[0].message,
        });
      }

      await itemService.deleteItem(value.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
