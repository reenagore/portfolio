const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies?.[env.adminCookieName]) {
    token = req.cookies[env.adminCookieName];
  }

  if (!token) {
    throw new ApiError(401, "Not authenticated");
  }

  const decoded = jwt.verify(token, env.jwtSecret);

  const admin = await Admin.findById(decoded.id).select("-password");

  if (!admin) {
    throw new ApiError(401, "Admin not found");
  }

  req.admin = admin;
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      throw new ApiError(403, "Not authorized");
    }
    next();
  };
};

module.exports = {
  protectAdmin,
  authorizeRoles,
};