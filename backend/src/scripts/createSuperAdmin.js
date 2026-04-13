const bcrypt = require("bcryptjs");
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

    const normalizedEmail = email.toLowerCase().trim();

    const existingAdmin = await Admin.findOne({ email: normalizedEmail });

    if (existingAdmin) {
      await Admin.deleteOne({ email: normalizedEmail });
      console.log("Existing super admin deleted");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
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
    console.error("Failed to create admin:", error.message);
    process.exit(1);
  }
};

createSuperAdmin();