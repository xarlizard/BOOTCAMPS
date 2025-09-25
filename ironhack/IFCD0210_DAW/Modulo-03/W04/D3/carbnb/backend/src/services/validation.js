import Joi from "joi";

export const itemValidation = {
  create: Joi.object({
    title: Joi.string().trim().min(1).max(200).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must not be empty",
      "string.max": "Title must not exceed 200 characters",
      "any.required": "Title is required",
    }),
    description: Joi.string()
      .trim()
      .max(1000)
      .allow("", null)
      .optional()
      .messages({
        "string.max": "Description must not exceed 1000 characters",
      }),
    tags: Joi.array()
      .items(Joi.string().trim().min(1).max(50))
      .max(10)
      .default([])
      .messages({
        "array.max": "Maximum 10 tags allowed",
        "string.min": "Tag must not be empty",
        "string.max": "Tag must not exceed 50 characters",
      }),
  }),

  update: Joi.object({
    title: Joi.string().trim().min(1).max(200).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must not be empty",
      "string.max": "Title must not exceed 200 characters",
      "any.required": "Title is required",
    }),
    description: Joi.string()
      .trim()
      .max(1000)
      .allow("", null)
      .optional()
      .messages({
        "string.max": "Description must not exceed 1000 characters",
      }),
    tags: Joi.array()
      .items(Joi.string().trim().min(1).max(50))
      .max(10)
      .default([])
      .messages({
        "array.max": "Maximum 10 tags allowed",
        "string.min": "Tag must not be empty",
        "string.max": "Tag must not exceed 50 characters",
      }),
  }),

  query: Joi.object({
    search: Joi.string().trim().max(100).allow("").optional(),
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
  }),

  id: Joi.object({
    id: Joi.number().integer().min(1).required().messages({
      "number.base": "ID must be a number",
      "number.integer": "ID must be an integer",
      "number.min": "ID must be positive",
      "any.required": "ID is required",
    }),
  }),
};
