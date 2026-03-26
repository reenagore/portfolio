const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [120, "Full name cannot exceed 120 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [120, "Email cannot exceed 120 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [50, "Phone cannot exceed 50 characters"],
      default: "",
    },
    company: {
      type: String,
      trim: true,
      maxlength: [120, "Company cannot exceed 120 characters"],
      default: "",
    },
    programTitle: {
      type: String,
      trim: true,
      maxlength: [180, "Program title cannot exceed 180 characters"],
      default: "",
    },
    registrationType: {
      type: String,
      enum: ["program", "event", "general"],
      default: "general",
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [3000, "Notes cannot exceed 3000 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "closed"],
      default: "new",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Registration", registrationSchema);