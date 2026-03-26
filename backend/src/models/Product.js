const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

const productPageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [180, "Title cannot exceed 180 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    coverImage: {
      type: imageSchema,
      default: () => ({ url: "", publicId: "" }),
    },
    cost: {
      type: Number,
      default: 0,
    },
    paymentEnabled: {
      type: Boolean,
      default: true,
    },
    format: {
      type: String,
      enum: ["pdf", "docx", "zip", "mp4", "link", ""],
      default: "",
    },
    downloadUrl: {
      type: String,
      default: "",
    },
    downloadFileName: {
      type: String,
      default: "",
    },
    downloadPublicId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    seoTitle: {
      type: String,
      default: "",
    },
    seoDescription: {
      type: String,
      default: "",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductPage", productPageSchema);