const Article = require("../models/Article");
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

const calculateReadTime = (html = "") => {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
};

const ensureUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Article.findOne({ slug });

    if (!existing) return slug;
    if (currentId && existing._id.toString() === currentId.toString()) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
};

const getPublicArticles = asyncHandler(async (req, res) => {
  const { category, featured, search = "" } = req.query;

  const query = { status: "published" };

  if (category) query.category = category;
  if (featured === "true") query.featured = true;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const articles = await Article.find(query).sort({
    publishedAt: -1,
    createdAt: -1,
  });

  res.status(200).json({ success: true, data: articles });
});

const getPublicArticleBySlug = asyncHandler(async (req, res) => {
  const article = await Article.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!article) throw new ApiError(404, "Article not found");

  res.status(200).json({ success: true, data: article });
});

const getAdminArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: articles });
});

const getAdminArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) throw new ApiError(404, "Article not found");

  res.status(200).json({ success: true, data: article });
});

const createArticle = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const baseSlug = slugify(body.title);
  if (!baseSlug) throw new ApiError(400, "A valid title is required");

  if (!stripHtml(body.content) || stripHtml(body.content).length < 50) {
    throw new ApiError(400, "Article content must be at least 50 characters");
  }

  const article = await Article.create({
    title: body.title,
    slug: await ensureUniqueSlug(baseSlug),
    excerpt: body.excerpt || "",
    content: body.content,
    category: body.category || "Financial Systems & Cashflow",
    coverImage: parseJSONField(body.coverImage, { url: "", publicId: "" }),
    tags: body.tags
      ? body.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [],
    authorName: body.authorName || "Reena Gore",
    status: body.status || "draft",
    featured: body.featured === true || body.featured === "true",
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    readTime: calculateReadTime(body.content),
    publishedAt: body.status === "published" ? new Date() : null,
  });

  res.status(201).json({
    success: true,
    message: "Article created successfully",
    data: article,
  });
});

const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) throw new ApiError(404, "Article not found");

  const body = sanitizeValue(req.body);

  if (body.title && body.title !== article.title) {
    article.title = body.title;
    article.slug = await ensureUniqueSlug(slugify(body.title), article._id);
  }

  if (body.content !== undefined) {
    if (!stripHtml(body.content) || stripHtml(body.content).length < 50) {
      throw new ApiError(400, "Article content must be at least 50 characters");
    }

    article.content = body.content;
    article.readTime = calculateReadTime(body.content);
  }

  if (body.coverImage !== undefined) {
    article.coverImage = parseJSONField(body.coverImage, article.coverImage);
  }

  article.excerpt = body.excerpt ?? article.excerpt;
  article.category = body.category ?? article.category;
  article.tags =
    body.tags !== undefined
      ? body.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : article.tags;
  article.authorName = body.authorName ?? article.authorName;
  article.status = body.status || article.status;
  article.featured =
    body.featured !== undefined
      ? body.featured === true || body.featured === "true"
      : article.featured;
  article.seoTitle = body.seoTitle ?? article.seoTitle;
  article.seoDescription = body.seoDescription ?? article.seoDescription;

  if (article.status === "published" && !article.publishedAt) {
    article.publishedAt = new Date();
  }

  await article.save();

  res.status(200).json({
    success: true,
    message: "Article updated successfully",
    data: article,
  });
});

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) throw new ApiError(404, "Article not found");

  await article.deleteOne();

  res.status(200).json({
    success: true,
    message: "Article deleted successfully",
  });
});

module.exports = {
  getPublicArticles,
  getPublicArticleBySlug,
  getAdminArticles,
  getAdminArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};