const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [180, "Title cannot exceed 180 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [400, "Excerpt cannot exceed 400 characters"],
      default: "",
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [50, "Content must be at least 50 characters"],
    },
    coverImage: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },
    category: {
      type: String,
      enum: [
        "Financial Systems & Cashflow",
        "Leadership & Decision-Making",
        "Operations & Efficiency",
        "SME Growth Strategy",
        "Market & Economic Insights",
      ],
      required: [true, "Category is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    authorName: {
      type: String,
      trim: true,
      default: "Reena Gore",
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [180, "SEO title cannot exceed 180 characters"],
      default: "",
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [320, "SEO description cannot exceed 320 characters"],
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    readTime: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);