const GalleryPage = require("../models/GalleryPage");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const slugify = require("../utils/slugify");
const { sanitizeValue } = require("../utils/sanitize");

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const parseJSONField = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const ensureUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await GalleryPage.findOne({ slug });

    if (!existing) return slug;
    if (currentId && existing._id.toString() === currentId.toString()) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter += 1;
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

  const galleries = await GalleryPage.find(query).sort({
    publishedAt: -1,
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: galleries,
  });
});

const getPublicGalleryBySlug = asyncHandler(async (req, res) => {
  const gallery = await GalleryPage.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!gallery) {
    throw new ApiError(404, "Gallery not found");
  }

  res.status(200).json({
    success: true,
    data: gallery,
  });
});

const getAdminGalleries = asyncHandler(async (req, res) => {
  const galleries = await GalleryPage.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: galleries,
  });
});

const getAdminGalleryById = asyncHandler(async (req, res) => {
  const gallery = await GalleryPage.findById(req.params.id);

  if (!gallery) {
    throw new ApiError(404, "Gallery not found");
  }

  res.status(200).json({
    success: true,
    data: gallery,
  });
});

const createGallery = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const baseSlug = slugify(body.title);
  if (!baseSlug) {
    throw new ApiError(400, "A valid title is required");
  }

  if (body.description && stripHtml(body.description).length < 10) {
    throw new ApiError(400, "Description is too short");
  }

  const galleryDetails = parseJSONField(body.galleryDetails, {});
  const coverImage = parseJSONField(body.coverImage, {
    url: "",
    publicId: "",
  });

  const gallery = await GalleryPage.create({
    title: body.title,
    slug: await ensureUniqueSlug(baseSlug),
    description: body.description || "",
    coverImage,
    images: galleryDetails.images || [],
    videoUrl: galleryDetails.videoUrl || "",
    status: body.status || "draft",
    featured: body.featured === "true" || body.featured === true,
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    publishedAt: body.status === "published" ? new Date() : null,
  });

  res.status(201).json({
    success: true,
    message: "Gallery created successfully",
    data: gallery,
  });
});

const updateGallery = asyncHandler(async (req, res) => {
  const gallery = await GalleryPage.findById(req.params.id);

  if (!gallery) {
    throw new ApiError(404, "Gallery not found");
  }

  const body = sanitizeValue(req.body);

  if (body.title && body.title !== gallery.title) {
    gallery.title = body.title;
    gallery.slug = await ensureUniqueSlug(slugify(body.title), gallery._id);
  }

  if (body.description !== undefined) {
    if (body.description && stripHtml(body.description).length < 10) {
      throw new ApiError(400, "Description is too short");
    }

    gallery.description = body.description;
  }

  if (body.coverImage !== undefined) {
    gallery.coverImage = parseJSONField(body.coverImage, gallery.coverImage);
  }

  if (body.galleryDetails !== undefined) {
    const galleryDetails = parseJSONField(body.galleryDetails, {});
    gallery.images = galleryDetails.images || [];
    gallery.videoUrl = galleryDetails.videoUrl || "";
  }

  gallery.status = body.status || gallery.status;
  gallery.featured =
    body.featured !== undefined
      ? body.featured === "true" || body.featured === true
      : gallery.featured;

  gallery.seoTitle = body.seoTitle ?? gallery.seoTitle;
  gallery.seoDescription = body.seoDescription ?? gallery.seoDescription;

  if (gallery.status === "published" && !gallery.publishedAt) {
    gallery.publishedAt = new Date();
  }

  await gallery.save();

  res.status(200).json({
    success: true,
    message: "Gallery updated successfully",
    data: gallery,
  });
});

const deleteGallery = asyncHandler(async (req, res) => {
  const gallery = await GalleryPage.findById(req.params.id);

  if (!gallery) {
    throw new ApiError(404, "Gallery not found");
  }

  await gallery.deleteOne();

  res.status(200).json({
    success: true,
    message: "Gallery deleted successfully",
  });
});

module.exports = {
  getPublicGalleries,
  getPublicGalleryBySlug,
  getAdminGalleries,
  getAdminGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
};