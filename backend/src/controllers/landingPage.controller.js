const LandingPage = require("../models/Landing");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { sanitizeValue } = require("../utils/sanitize");
const slugify = require("../utils/slugify");

const ensureUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await LandingPage.findOne({ slug });

    if (!existing) return slug;
    if (currentId && existing._id.toString() === currentId.toString()) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
};

const parseJSONField = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const getPublicLandingPages = asyncHandler(async (req, res) => {
  const { type, featured, search = "", limit = 20, page = 1 } = req.query;

  const query = {
    status: "published",
  };

  if (type) query.type = type;
  if (featured === "true") query.featured = true;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { "hero.headline": { $regex: search, $options: "i" } },
      { "hero.subheadline": { $regex: search, $options: "i" } },
    ];
  }

  const safeLimit = Math.min(Number(limit) || 20, 50);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    LandingPage.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(safeLimit),
    LandingPage.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  });
});

const getAdminLandingPages = asyncHandler(async (req, res) => {
  const { type, status, search = "" } = req.query;

  const query = {};
  if (type) query.type = type;
  if (status) query.status = status;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
    ];
  }

  const items = await LandingPage.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: items,
  });
});

const getPublicLandingPageBySlug = asyncHandler(async (req, res) => {
  const item = await LandingPage.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!item) {
    throw new ApiError(404, "Landing page not found");
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

const getAdminLandingPageById = asyncHandler(async (req, res) => {
  const item = await LandingPage.findById(req.params.id);

  if (!item) {
    throw new ApiError(404, "Landing page not found");
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

const createLandingPage = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const baseSlug = slugify(body.title);
  if (!baseSlug) {
    throw new ApiError(400, "A valid title is required");
  }

  const slug = await ensureUniqueSlug(baseSlug);

  const type = body.type;
  if (!["event", "product", "gallery"].includes(type)) {
    throw new ApiError(400, "Invalid landing page type");
  }

  const description = body.description || "";
  const hero = parseJSONField(body.hero, {});
  const seo = parseJSONField(body.seo, {});
  const eventDetails = parseJSONField(body.eventDetails, {});
  const productDetails = parseJSONField(body.productDetails, {});
  const galleryDetails = parseJSONField(body.galleryDetails, {});
  const sections = parseJSONField(body.sections, []);

  if (description && stripHtml(description).length < 10) {
    throw new ApiError(400, "Description is too short");
  }

  const item = await LandingPage.create({
    type,
    title: body.title,
    slug,
    status: body.status || "draft",
    description,
    hero,
    seo,
    eventDetails,
    productDetails,
    galleryDetails,
    sections,
    featured: body.featured === "true" || body.featured === true,
    publishedAt:
      body.status === "published" ? body.publishedAt || new Date() : null,
  });

  res.status(201).json({
    success: true,
    message: "Landing page created successfully",
    data: item,
  });
});

const updateLandingPage = asyncHandler(async (req, res) => {
  const item = await LandingPage.findById(req.params.id);

  if (!item) {
    throw new ApiError(404, "Landing page not found");
  }

  const body = sanitizeValue(req.body);

  let nextSlug = item.slug;
  if (body.title && body.title !== item.title) {
    nextSlug = await ensureUniqueSlug(slugify(body.title), item._id);
  }

  item.type = body.type || item.type;
  item.title = body.title || item.title;
  item.slug = nextSlug;
  item.status = body.status || item.status;
  item.featured =
    body.featured !== undefined
      ? body.featured === "true" || body.featured === true
      : item.featured;

  if (body.description !== undefined) {
    if (body.description && stripHtml(body.description).length < 10) {
      throw new ApiError(400, "Description is too short");
    }
    item.description = body.description;
  }

  if (body.hero !== undefined) {
    item.hero = parseJSONField(body.hero, item.hero);
  }

  if (body.seo !== undefined) {
    item.seo = parseJSONField(body.seo, item.seo);
  }

  if (body.eventDetails !== undefined) {
    item.eventDetails = parseJSONField(body.eventDetails, item.eventDetails);
  }

  if (body.productDetails !== undefined) {
    item.productDetails = parseJSONField(body.productDetails, item.productDetails);
  }

  if (body.galleryDetails !== undefined) {
    item.galleryDetails = parseJSONField(body.galleryDetails, item.galleryDetails);
  }

  if (body.sections !== undefined) {
    item.sections = parseJSONField(body.sections, item.sections);
  }

  if (item.status === "published" && !item.publishedAt) {
    item.publishedAt = new Date();
  }

  await item.save();

  res.status(200).json({
    success: true,
    message: "Landing page updated successfully",
    data: item,
  });
});

const deleteLandingPage = asyncHandler(async (req, res) => {
  const item = await LandingPage.findById(req.params.id);

  if (!item) {
    throw new ApiError(404, "Landing page not found");
  }

  await item.deleteOne();

  res.status(200).json({
    success: true,
    message: "Landing page deleted successfully",
  });
});

module.exports = {
  getPublicLandingPages,
  getAdminLandingPages,
  getPublicLandingPageBySlug,
  getAdminLandingPageById,
  createLandingPage,
  updateLandingPage,
  deleteLandingPage,
};