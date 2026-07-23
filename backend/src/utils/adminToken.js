const jwt = require("jsonwebtoken");
const env = require("../config/env");

const signAdminToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      role: admin.role,
      email: admin.email,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn || "7d",
    }
  );
};

const getAdminCookieOptions = () => {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  };
};

module.exports = {
  signAdminToken,
  getAdminCookieOptions,
};
