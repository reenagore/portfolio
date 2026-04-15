require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    const fullName = "Super Admin";

    const existing = await Admin.findOne({ email });

    if (existing) {
      existing.fullName = fullName;
      existing.password = password;
      existing.role = "super_admin";
      existing.isActive = true;
      await existing.save();

      console.log("Admin updated successfully");
    } else {
      await Admin.create({
        fullName,
        email,
        password,
        role: "super_admin",
      });

      console.log("Admin created successfully");
    }

    process.exit(0);
  } catch (error) {
    console.error("seedAdmin error:", error);
    process.exit(1);
  }
}

seedAdmin();