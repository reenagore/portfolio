const ProductPage = require("../models/Product");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const slugify = require("../utils/slugify");
const { sanitizeValue } = require("../utils/sanitize");

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const parseJSONField = (value, fallback) => {
  if (!value) return fallback;
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
    const existing = await ProductPage.findOne({ slug });

    if (!existing) return slug;
    if (currentId && existing._id.toString() === currentId.toString()) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
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

  const products = await ProductPage.find(query).sort({
    publishedAt: -1,
    createdAt: -1,
  });

  res.status(200).json({ success: true, data: products });
});

const getPublicProductBySlug = asyncHandler(async (req, res) => {
  const product = await ProductPage.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!product) throw new ApiError(404, "Product not found");

  res.status(200).json({ success: true, data: product });
});

const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await ProductPage.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: products });
});

const getAdminProductById = asyncHandler(async (req, res) => {
  const product = await ProductPage.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  res.status(200).json({ success: true, data: product });
});

const createProduct = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const baseSlug = slugify(body.title);
  if (!baseSlug) throw new ApiError(400, "A valid title is required");

  if (body.description && stripHtml(body.description).length < 10) {
    throw new ApiError(400, "Description is too short");
  }

  const productDetails = parseJSONField(body.productDetails, {});

  const product = await ProductPage.create({
    title: body.title,
    slug: await ensureUniqueSlug(baseSlug),
    description: body.description || "",
    coverImage: parseJSONField(body.coverImage, { url: "", publicId: "" }),
    cost: Number(productDetails.cost || 0),
    currency: productDetails.currency || "KES",
    paymentEnabled:
      productDetails.paymentEnabled === true ||
      productDetails.paymentEnabled === "true",
    format: productDetails.format || "",
    downloadUrl: productDetails.downloadUrl || "",
    downloadFileName: productDetails.downloadFileName || "",
    downloadPublicId: productDetails.downloadPublicId || "",
    status: body.status || "draft",
    featured: body.featured === true || body.featured === "true",
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    publishedAt: body.status === "published" ? new Date() : null,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await ProductPage.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  const body = sanitizeValue(req.body);

  if (body.title && body.title !== product.title) {
    product.title = body.title;
    product.slug = await ensureUniqueSlug(slugify(body.title), product._id);
  }

  if (body.description !== undefined) {
    if (body.description && stripHtml(body.description).length < 10) {
      throw new ApiError(400, "Description is too short");
    }

    product.description = body.description;
  }

  if (body.coverImage !== undefined) {
    product.coverImage = parseJSONField(body.coverImage, product.coverImage);
  }

  if (body.productDetails !== undefined) {
    const productDetails = parseJSONField(body.productDetails, {});

    product.cost =
      productDetails.cost !== undefined ? Number(productDetails.cost) : product.cost;
    product.currency = productDetails.currency ?? product.currency;
    product.paymentEnabled =
      productDetails.paymentEnabled !== undefined
        ? productDetails.paymentEnabled === true ||
          productDetails.paymentEnabled === "true"
        : product.paymentEnabled;
    product.format = productDetails.format ?? product.format;
    product.downloadUrl = productDetails.downloadUrl ?? product.downloadUrl;
    product.downloadFileName =
      productDetails.downloadFileName ?? product.downloadFileName;
    product.downloadPublicId =
      productDetails.downloadPublicId ?? product.downloadPublicId;
  }

  product.status = body.status || product.status;
  product.featured =
    body.featured !== undefined
      ? body.featured === true || body.featured === "true"
      : product.featured;
  product.seoTitle = body.seoTitle ?? product.seoTitle;
  product.seoDescription = body.seoDescription ?? product.seoDescription;

  if (product.status === "published" && !product.publishedAt) {
    product.publishedAt = new Date();
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductPage.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

module.exports = {
  getPublicProducts,
  getPublicProductBySlug,
  getAdminProducts,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};