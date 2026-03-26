const mongoose = require("mongoose");

const bookPreorderSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
      trim: true,
      default: "Decoding Business for Growth",
    },
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
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    paymentReference: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      index: true,
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "confirmed", "fulfilled", "archived"],
      default: "new",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookPreorder", bookPreorderSchema);