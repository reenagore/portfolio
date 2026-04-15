const EventGallery = require("../models/EventGallery");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const slugify = require("../utils/slugify");
const { sanitizeValue } = require("../utils/sanitize");

const ensureUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await EventGallery.findOne({ slug });

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

const getPublicEventGalleries = asyncHandler(async (req, res) => {
  const items = await EventGallery.find({ status: "published" }).sort({
    eventDate: -1,
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: items,
  });
});

const getPublicEventGalleryBySlug = asyncHandler(async (req, res) => {
  const item = await EventGallery.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!item) throw new ApiError(404, "Gallery not found");

  res.status(200).json({
    success: true,
    data: item,
  });
});

const getAdminEventGalleries = asyncHandler(async (req, res) => {
  const items = await EventGallery.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: items,
  });
});

const getAdminEventGalleryById = asyncHandler(async (req, res) => {
  const item = await EventGallery.findById(req.params.id);

  if (!item) throw new ApiError(404, "Gallery not found");

  res.status(200).json({
    success: true,
    data: item,
  });
});

const createEventGallery = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);
  const baseSlug = slugify(body.title);

  if (!baseSlug) throw new ApiError(400, "Valid title required");

  const item = await EventGallery.create({
    title: body.title,
    slug: await ensureUniqueSlug(baseSlug),
    description: body.description || "",
    eventDate: body.eventDate || null,
    coverImage: parseJSONField(body.coverImage, { url: "", publicId: "" }),
    images: parseJSONField(body.images, []),
    status: body.status || "draft",
  });

  res.status(201).json({
    success: true,
    message: "Event gallery created",
    data: item,
  });
});

const updateEventGallery = asyncHandler(async (req, res) => {
  const item = await EventGallery.findById(req.params.id);

  if (!item) throw new ApiError(404, "Gallery not found");

  const body = sanitizeValue(req.body);

  if (body.title && body.title !== item.title) {
    item.slug = await ensureUniqueSlug(slugify(body.title), item._id);
    item.title = body.title;
  }

  if (body.description !== undefined) item.description = body.description;
  if (body.eventDate !== undefined) item.eventDate = body.eventDate || null;
  if (body.coverImage !== undefined) {
    item.coverImage = parseJSONField(body.coverImage, item.coverImage);
  }
  if (body.images !== undefined) {
    item.images = parseJSONField(body.images, item.images);
  }
  if (body.status !== undefined) item.status = body.status;

  await item.save();

  res.status(200).json({
    success: true,
    message: "Event gallery updated",
    data: item,
  });
});

const deleteEventGallery = asyncHandler(async (req, res) => {
  const item = await EventGallery.findById(req.params.id);

  if (!item) throw new ApiError(404, "Gallery not found");

  await item.deleteOne();

  res.status(200).json({
    success: true,
    message: "Event gallery deleted",
  });
});

module.exports = {
  getPublicEventGalleries,
  getPublicEventGalleryBySlug,
  getAdminEventGalleries,
  getAdminEventGalleryById,
  createEventGallery,
  updateEventGallery,
  deleteEventGallery,
};