const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      index: true,
    },
    fullName: {
      type: String,
      trim: true,
      default: "",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be greater than 0"],
    },
    currency: {
      type: String,
      default: "KES",
    },
    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    paystackAccessCode: {
      type: String,
      default: "",
    },
    paystackAuthorizationUrl: {
      type: String,
      default: "",
    },
    purpose: {
      type: String,
      enum: [
        "consultation",
        "program",
        "audit",
        "implementation",
        "custom",
      ],
      default: "consultation",
    },
    service: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: [
        "initialized",
        "pending",
        "success",
        "failed",
        "abandoned",
        "ongoing",
        "processing",
        "queued",
        "reversed",
      ],
      default: "initialized",
      index: true,
    },
    channel: {
      type: String,
      default: "",
    },
    paidAt: {
      type: Date,
      default: null,
    },
    customerCode: {
      type: String,
      default: "",
    },
    gatewayResponse: {
      type: String,
      default: "",
    },
    metadata: {
      type: Object,
      default: {},
    },
    rawInitializeResponse: {
      type: Object,
      default: {},
    },
    rawVerifyResponse: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);