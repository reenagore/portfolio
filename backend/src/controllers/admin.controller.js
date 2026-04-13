const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const signToken = (adminId) => {
  return jwt.sign({ id: adminId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

const sendAuthCookie = (res, token) => {
  res.cookie(env.adminCookieName, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};


 
// const loginAdmin = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const admin = await Admin.findOne({ email });
//   if (!admin) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const token = signToken(admin._id);

//   sendAuthCookie(res, token);

//   res.status(200).json({
//     success: true,
//     message: "Login successful",
//     data: {
//       admin: {
//         id: admin._id,
//         fullName: admin.fullName,
//         email: admin.email,
//         role: admin.role,
//       },
//     },
//   });
// });

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN BODY:", req.body);

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();
  console.log("NORMALIZED EMAIL:", normalizedEmail);

  const admin = await Admin.findOne({ email: normalizedEmail }).select("+password");
  console.log("ADMIN FOUND:", !!admin);
  console.log("ADMIN EMAIL IN DB:", admin?.email);
  console.log("HAS PASSWORD:", !!admin?.password);

  if (!admin) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  console.log("PASSWORD MATCH:", isMatch);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = signToken(admin._id);

  sendAuthCookie(res, token);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
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