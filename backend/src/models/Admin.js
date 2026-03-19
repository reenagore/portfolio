const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    role: {
      type: String,
      enum: ["super_admin", "editor"],
      default: "editor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);