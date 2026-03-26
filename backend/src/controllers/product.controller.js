const ProductPage = require("../models/Product");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const slugify = require("../utils/slugify");
const { sanitizeValue } = require("../utils/sanitize");

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const ensureUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await ProductPage.findOne({ slug });
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

const getPublicProducts = asyncHandler(async (req, res) => {
  const { featured, search = "" } = req.query;
  const query = { status: "published" };

  if (featured === "true") query.featured = true;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { format: { $regex: search, $options: "i" } },
    ];
  }

  const items = await ProductPage.find(query).sort({ publishedAt: -1, createdAt: -1 });
  res.status(200).json({ success: true, data: items });
});

const getAdminProducts = asyncHandler(async (req, res) => {
  const items = await ProductPage.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: items });
});

const getPublicProductBySlug = asyncHandler(async (req, res) => {
  const item = await ProductPage.findOne({ slug: req.params.slug, status: "published" });
  if (!item) throw new ApiError(404, "Product not found");
  res.status(200).json({ success: true, data: item });
});

const getAdminProductById = asyncHandler(async (req, res) => {
  const item = await ProductPage.findById(req.params.id);
  if (!item) throw new ApiError(404, "Product not found");
  res.status(200).json({ success: true, data: item });
});

const createProduct = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);
  const baseSlug = slugify(body.title);
  if (!baseSlug) throw new ApiError(400, "Valid title required");

  if (body.description && stripHtml(body.description).length < 10) {
    throw new ApiError(400, "Description is too short");
  }

  const details = parseJSONField(body.productDetails, {});

  const item = await ProductPage.create({
    title: body.title,
    slug: await ensureUniqueSlug(baseSlug),
    description: body.description || "",
    coverImage: parseJSONField(body.coverImage, { url: "", publicId: "" }),
    cost: Number(details.cost || 0),
    paymentEnabled: details.paymentEnabled === true || details.paymentEnabled === "true",
    format: details.format || "",
    downloadUrl: details.downloadUrl || "",
    downloadFileName: details.downloadFileName || "",
    downloadPublicId: details.downloadPublicId || "",
    status: body.status || "draft",
    featured: body.featured === "true" || body.featured === true,
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    publishedAt: body.status === "published" ? new Date() : null,
  });

  res.status(201).json({ success: true, message: "Product created", data: item });
});

const updateProduct = asyncHandler(async (req, res) => {
  const item = await ProductPage.findById(req.params.id);
  if (!item) throw new ApiError(404, "Product not found");

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

  const details = body.productDetails
    ? parseJSONField(body.productDetails, {})
    : null;

  if (details) {
    item.cost = details.cost !== undefined ? Number(details.cost) : item.cost;
    item.paymentEnabled =
      details.paymentEnabled !== undefined
        ? details.paymentEnabled === true || details.paymentEnabled === "true"
        : item.paymentEnabled;
    item.format = details.format ?? item.format;
    item.downloadUrl = details.downloadUrl ?? item.downloadUrl;
    item.downloadFileName = details.downloadFileName ?? item.downloadFileName;
    item.downloadPublicId = details.downloadPublicId ?? item.downloadPublicId;
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
  res.status(200).json({ success: true, message: "Product updated", data: item });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const item = await ProductPage.findById(req.params.id);
  if (!item) throw new ApiError(404, "Product not found");
  await item.deleteOne();
  res.status(200).json({ success: true, message: "Product deleted" });
});

module.exports = {
  getPublicProducts,
  getAdminProducts,
  getPublicProductBySlug,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};