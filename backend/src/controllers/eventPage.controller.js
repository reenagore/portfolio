const EventPage = require("../models/EventPage");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const slugify = require("../utils/slugify");
const { sanitizeValue } = require("../utils/sanitize");

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const ensureUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await EventPage.findOne({ slug });

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

const getPublicEvents = asyncHandler(async (req, res) => {
  const { featured, search = "" } = req.query;
  const query = { status: "published" };

  if (featured === "true") query.featured = true;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  const items = await EventPage.find(query).sort({ publishedAt: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    data: items,
  });
});

const getAdminEvents = asyncHandler(async (req, res) => {
  const items = await EventPage.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: items,
  });
});

const getPublicEventBySlug = asyncHandler(async (req, res) => {
  const item = await EventPage.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!item) throw new ApiError(404, "Event not found");

  res.status(200).json({
    success: true,
    data: item,
  });
});

const getAdminEventById = asyncHandler(async (req, res) => {
  const item = await EventPage.findById(req.params.id);

  if (!item) throw new ApiError(404, "Event not found");

  res.status(200).json({
    success: true,
    data: item,
  });
});

const createEvent = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);
  const baseSlug = slugify(body.title);

  if (!baseSlug) throw new ApiError(400, "Valid title required");

  if (body.description && stripHtml(body.description).length < 10) {
    throw new ApiError(400, "Description is too short");
  }

  const item = await EventPage.create({
    title: body.title,
    slug: await ensureUniqueSlug(baseSlug),
    description: body.description || "",
    coverImage: parseJSONField(body.coverImage, { url: "", publicId: "" }),
    date: body.date || null,
    time: body.time || "",
    location: body.location || "",
    cost: Number(body.cost || 0),
    paymentEnabled: body.paymentEnabled === "true" || body.paymentEnabled === true,
    status: body.status || "draft",
    featured: body.featured === "true" || body.featured === true,
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    publishedAt: body.status === "published" ? new Date() : null,
  });

  res.status(201).json({
    success: true,
    message: "Event created",
    data: item,
  });
});

const updateEvent = asyncHandler(async (req, res) => {
  const item = await EventPage.findById(req.params.id);

  if (!item) throw new ApiError(404, "Event not found");

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

  item.date = body.date ?? item.date;
  item.time = body.time ?? item.time;
  item.location = body.location ?? item.location;
  item.cost = body.cost !== undefined ? Number(body.cost) : item.cost;
  item.paymentEnabled =
    body.paymentEnabled !== undefined
      ? body.paymentEnabled === "true" || body.paymentEnabled === true
      : item.paymentEnabled;
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

  res.status(200).json({
    success: true,
    message: "Event updated",
    data: item,
  });
});

const deleteEvent = asyncHandler(async (req, res) => {
  const item = await EventPage.findById(req.params.id);

  if (!item) throw new ApiError(404, "Event not found");

  await item.deleteOne();

  res.status(200).json({
    success: true,
    message: "Event deleted",
  });
});

module.exports = {
  getPublicEvents,
  getAdminEvents,
  getPublicEventBySlug,
  getAdminEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};