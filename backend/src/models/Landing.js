const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    items: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    image: {
      type: imageSchema,
      default: () => ({ url: "", publicId: "" }),
    },
  },
  { _id: false }
);

const landingPageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["event", "product", "gallery"],
      required: [true, "Landing page type is required"],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [180, "Title cannot exceed 180 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    hero: {
      eyebrow: {
        type: String,
        trim: true,
        default: "",
      },
      headline: {
        type: String,
        trim: true,
        default: "",
      },
      subheadline: {
        type: String,
        trim: true,
        default: "",
      },
      coverImage: {
        type: imageSchema,
        default: () => ({ url: "", publicId: "" }),
      },
      ctaText: {
        type: String,
        trim: true,
        default: "",
      },
      ctaLink: {
        type: String,
        trim: true,
        default: "",
      },
    },

    seo: {
      title: {
        type: String,
        trim: true,
        default: "",
      },
      description: {
        type: String,
        trim: true,
        default: "",
      },
    },

    eventDetails: {
      date: {
        type: Date,
        default: null,
      },
      time: {
        type: String,
        trim: true,
        default: "",
      },
      location: {
        type: String,
        trim: true,
        default: "",
      },
      price: {
        type: Number,
        default: 0,
      },
      capacity: {
        type: Number,
        default: 0,
      },
      registrationLink: {
        type: String,
        trim: true,
        default: "",
      },
    },

    productDetails: {
      price: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        trim: true,
        default: "KES",
      },
      paymentEnabled: {
        type: Boolean,
        default: true,
      },
      deliveryType: {
        type: String,
        enum: ["digital", "physical", "service", ""],
        default: "",
      },
      paymentLabel: {
        type: String,
        trim: true,
        default: "Buy Now",
      },
    },

    galleryDetails: {
      eventDate: {
        type: Date,
        default: null,
      },
      location: {
        type: String,
        trim: true,
        default: "",
      },
      galleryImages: {
        type: [imageSchema],
        default: [],
      },
      videoEmbedUrl: {
        type: String,
        trim: true,
        default: "",
      },
    },

    sections: {
      type: [sectionSchema],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("LandingPage", landingPageSchema);