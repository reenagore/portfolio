const asyncHandler = require("../utils/asyncHandler");

const getHealth = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

module.exports = {
  getHealth,
};