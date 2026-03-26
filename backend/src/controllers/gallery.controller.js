const GalleryPage = require("../models/Gallery");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const slugify = require("../utils/slugify");
const { sanitizeValue } = require("../utils/sanitize");

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const ensureUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await GalleryPage.findOne({ slug });
    if (!existing) return slug;
    if (currentId && existing._id.toString() === currentId.toString()) return slug;
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
};

const parseJSONField = (value, fallback) => {
  if (!value) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const getPublicGalleries = asyncHandler(async (req, res) => {
  const { featured, search = "" } = req.query;
  const query = { status: "published" };

  if (featured === "true") query.featured = true;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const items = await GalleryPage.find(query).sort({ publishedAt: -1, createdAt: -1 });
  res.status(200).json({ success: true, data: items });
});

const getAdminGalleries = asyncHandler(async (req, res) => {
  const items = await GalleryPage.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: items });
});

const getPublicGalleryBySlug = asyncHandler(async (req, res) => {
  const item = await GalleryPage.findOne({ slug: req.params.slug, status: "published" });
  if (!item) throw new ApiError(404, "Gallery not found");
  res.status(200).json({ success: true, data: item });
});

const getAdminGalleryById = asyncHandler(async (req, res) => {
  const item = await GalleryPage.findById(req.params.id);
  if (!item) throw new ApiError(404, "Gallery not found");
  res.status(200).json({ success: true, data: item });
});

const createGallery = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);
  const baseSlug = slugify(body.title);
  if (!baseSlug) throw new ApiError(400, "Valid title required");

  if (body.description && stripHtml(body.description).length < 10) {
    throw new ApiError(400, "Description is too short");
  }

  const details = parseJSONField(body.galleryDetails, {});

  const item = await GalleryPage.create({
    title: body.title,
    slug: await ensureUniqueSlug(baseSlug),
    description: body.description || "",
    coverImage: parseJSONField(body.coverImage, { url: "", publicId: "" }),
    images: details.images || [],
    videoUrl: details.videoUrl || "",
    status: body.status || "draft",
    featured: body.featured === "true" || body.featured === true,
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    publishedAt: body.status === "published" ? new Date() : null,
  });

  res.status(201).json({ success: true, message: "Gallery created", data: item });
});

const updateGallery = asyncHandler(async (req, res) => {
  const item = await GalleryPage.findById(req.params.id);
  if (!item) throw new ApiError(404, "Gallery not found");

  const body = sanitizeValue(req.body);

  if (body.title && body.title !== item.title) {
    item.slug = await ensureUniqueSlug(slugify(body.title), item._id);
    item.title = body.title;
  }

  if (body.description !== undefined) {
    if (body.description && stripHtml(body.description).length < 10) {
      throw new ApiError(400, "Description is too short");
    }
    item.description = body.description;
  }

  if (body.coverImage !== undefined) {
    item.coverImage = parseJSONField(body.coverImage, item.coverImage);
  }

  const details = body.galleryDetails
    ? parseJSONField(body.galleryDetails, {})
    : null;

  if (details) {
    item.images = details.images ?? item.images;
    item.videoUrl = details.videoUrl ?? item.videoUrl;
  }

  item.status = body.status || item.status;
  item.featured =
    body.featured !== undefined
      ? body.featured === "true" || body.featured === true
      : item.featured;
  item.seoTitle = body.seoTitle ?? item.seoTitle;
  item.seoDescription = body.seoDescription ?? item.seoDescription;

  if (item.status === "published" && !item.publishedAt) {
    item.publishedAt = new Date();
  }

  await item.save();
  res.status(200).json({ success: true, message: "Gallery updated", data: item });
});

const deleteGallery = asyncHandler(async (req, res) => {
  const item = await GalleryPage.findById(req.params.id);
  if (!item) throw new ApiError(404, "Gallery not found");
  await item.deleteOne();
  res.status(200).json({ success: true, message: "Gallery deleted" });
});

module.exports = {
  getPublicGalleries,
  getAdminGalleries,
  getPublicGalleryBySlug,
  getAdminGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
};