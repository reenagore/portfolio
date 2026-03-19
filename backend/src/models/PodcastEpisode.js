const mongoose = require("mongoose");

const podcastEpisodeSchema = new mongoose.Schema(
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
    summary: {
      type: String,
      trim: true,
      maxlength: [1200, "Summary cannot exceed 1200 characters"],
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    embedUrl: {
      type: String,
      required: [true, "Embed URL is required"],
      trim: true,
    },
    platform: {
      type: String,
      enum: ["youtube", "spotify", "apple", "soundcloud", "other"],
      default: "youtube",
    },
    thumbnail: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },
    duration: {
      type: String,
      trim: true,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    episodeNumber: {
      type: Number,
      default: null,
      min: 1,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PodcastEpisode", podcastEpisodeSchema);