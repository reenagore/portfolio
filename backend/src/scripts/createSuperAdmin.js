const mongoose = require("mongoose");
const env = require("../config/env");
const Admin = require("../models/Admin");

const createSuperAdmin = async () => {
  try {
    const fullName = process.env.SUPER_ADMIN_NAME;
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;

    if (!fullName || !email || !password) {
      throw new Error(
        "Missing SUPER_ADMIN_NAME, SUPER_ADMIN_EMAIL, or SUPER_ADMIN_PASSWORD in .env"
      );
    }

    await mongoose.connect(env.mongoUri, {
      autoIndex: true,
    });

    console.log("MongoDB connected");

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });

    if (existingAdmin) {
      console.log("Admin already exists with this email:");
      console.log(`Email: ${existingAdmin.email}`);
      process.exit(0);
    }

    const admin = await Admin.create({
      fullName,
      email: email.toLowerCase(),
      password,
      role: "super_admin",
      isActive: true,
    });

    console.log("Super admin created successfully");
    console.log({
      id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("Failed to create super admin:", error.message);
    process.exit(1);
  }
};

createSuperAdmin();