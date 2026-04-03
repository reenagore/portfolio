const mongoose = require("mongoose");

const programmeOrderSchema = new mongoose.Schema(
  {
    programmeTitle: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    programmeSlug: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "KES",
    },
    paymentReference: {
      type: String,
      trim: true,
      default: "",
      unique: true,
      sparse: true,
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
      enum: ["new", "confirmed", "archived"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProgrammeOrder", programmeOrderSchema);