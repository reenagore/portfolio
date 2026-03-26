const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
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
    company: {
      type: String,
      trim: true,
      maxlength: [120, "Company cannot exceed 120 characters"],
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [50, "Phone number cannot exceed 50 characters"],
      default: "",
    },
    service: {
      type: String,
      enum: [
        "Profit Pulse Audit",
        "FPO Method Implementation",
        "Executive & Corporate Programs",
        "Strategy Consultation",
      ],
      required: [true, "Service is required"],
      index: true,
    },
    businessStage: {
      type: String,
      enum: [
        "Startup",
        "Early Growth",
        "Scaling SME",
        "Established Business",
        "Corporate / Institution",
        "",
      ],
      default: "",
    },
    annualRevenueRange: {
      type: String,
      enum: [
        "Below $100K",
        "$100K - $500K",
        "$500K - $2M",
        "$2M - $10M",
        "$10M+",
        "",
      ],
      default: "",
    },
    preferredContactMethod: {
      type: String,
      enum: ["Email", "Phone", "WhatsApp", "Either"],
      default: "Email",
    },
    preferredSessionType: {
      type: String,
      enum: ["Virtual", "In Person", "Either"],
      default: "Virtual",
    },
    preferredDate: {
      type: Date,
      default: null,
    },
    preferredTime: {
      type: String,
      trim: true,
      maxlength: [50, "Preferred time cannot exceed 50 characters"],
      default: "",
    },
    challengeSummary: {
      type: String,
      required: [true, "Challenge summary is required"],
      trim: true,
      minlength: [20, "Challenge summary must be at least 20 characters"],
      maxlength: [5000, "Challenge summary cannot exceed 5000 characters"],
    },
    goals: {
      type: String,
      trim: true,
      maxlength: [3000, "Goals cannot exceed 3000 characters"],
      default: "",
    },
    source: {
      type: String,
      trim: true,
      maxlength: [120, "Source cannot exceed 120 characters"],
      default: "Website",
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "scheduled", "closed", "archived"],
      default: "new",
      index: true,
    },
    internalNotes: {
      type: String,
      trim: true,
      maxlength: [5000, "Internal notes cannot exceed 5000 characters"],
      default: "",
    },
    contactedAt: {
      type: Date,
      default: null,
    },
    scheduledAt: {
      type: Date,
      default: null,
    },
    closedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);