const Admin = require("../models/Admin");
const { signAdminToken, getAdminCookieOptions } = require("../utils/adminToken");

const loginAdmin = async (req, res) => {
  try {
    const email = req.body.email?.trim()?.toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email, isActive: true }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = signAdminToken(admin);

    res.cookie("admin_token", token, getAdminCookieOptions());

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        admin: {
          _id: admin._id,
          fullName: admin.fullName,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (error) {
    console.error("loginAdmin error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const logoutAdmin = async (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const getCurrentAdmin = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      admin: req.admin,
    },
  });
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
};