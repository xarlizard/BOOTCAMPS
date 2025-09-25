export const notFound = (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: {
      health: "/api/health",
      items: "/api/items",
    },
  });
};
