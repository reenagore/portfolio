// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");


const signToken = (adminId) => {
  return jwt.sign({ id: adminId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn || "7d",
  });
};

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = signToken(admin._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      },
    },
  });
});



/**
 * LOGOUT
 */
const logoutAdmin = asyncHandler(async (req, res) => {
  res.clearCookie(env.adminCookieName);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

/**
 * CURRENT ADMIN
 */
const getCurrentAdmin = asyncHandler(async (req, res) => {
  const admin = req.admin;

  res.status(200).json({
    success: true,
    data: {
      id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
    },
  });
});

/**
 * GET ALL ADMINS
 */
const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().select("-password");

  res.status(200).json({
    success: true,
    data: admins,
  });
});

module.exports = {
    loginAdmin,
    logoutAdmin,
    getCurrentAdmin,
    getAllAdmins,
  };