export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Prisma errors
  if (err.code === "P2002") {
    return res.status(409).json({
      error: "Conflict",
      message: "A record with this data already exists",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      error: "Not Found",
      message: "Record not found",
    });
  }

  // Validation errors (Joi)
  if (err.isJoi) {
    return res.status(400).json({
      error: "Validation Error",
      message: err.details[0].message,
    });
  }

  // Custom errors
  if (err.status) {
    return res.status(err.status).json({
      error: err.name || "Error",
      message: err.message,
    });
  }

  // Default server error
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
};
