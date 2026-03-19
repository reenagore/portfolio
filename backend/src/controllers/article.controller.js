const Article = require("../models/Article");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { sanitizeValue } = require("../utils/sanitize");
const slugify = require("../utils/slugify");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../services/cloudinary.service");

const calculateReadTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const ensureUniqueSlug = async (Model, baseSlug, currentId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Model.findOne({ slug });

    if (!existing) return slug;
    if (currentId && existing._id.toString() === currentId.toString()) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
};

const getPublicArticles = asyncHandler(async (req, res) => {
  const { category, featured, limit = 20, page = 1, search = "" } = req.query;

  const query = {
    status: "published",
  };

  if (category) {
    query.category = category;
  }

  if (featured === "true") {
    query.featured = true;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  const safeLimit = Math.min(Number(limit) || 20, 50);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const [articles, total] = await Promise.all([
    Article.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(safeLimit),
    Article.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: articles,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  });
});

const getAdminArticles = asyncHandler(async (req, res) => {
  const { status, category, search = "" } = req.query;

  const query = {};

  if (status) query.status = status;
  if (category) query.category = category;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
    ];
  }

  const articles = await Article.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: articles,
  });
});

const getArticleBySlug = asyncHandler(async (req, res) => {
  const article = await Article.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  res.status(200).json({
    success: true,
    data: article,
  });
});

const getAdminArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  res.status(200).json({
    success: true,
    data: article,
  });
});

const createArticle = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const baseSlug = slugify(body.title);
  if (!baseSlug) {
    throw new ApiError(400, "A valid title is required to generate slug");
  }

  const slug = await ensureUniqueSlug(Article, baseSlug);
  let coverImage = { url: "", publicId: "" };

  if (req.file) {
    const uploaded = await uploadToCloudinary(req.file.path, "reena-gore/articles");
    coverImage = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  const article = await Article.create({
    title: body.title,
    slug,
    excerpt: body.excerpt || "",
    content: body.content,
    category: body.category,
    tags: Array.isArray(body.tags)
      ? body.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : typeof body.tags === "string"
      ? body.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [],
    authorName: body.authorName || "Reena Gore",
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    featured: body.featured === "true" || body.featured === true,
    status: body.status || "draft",
    publishedAt:
      body.status === "published" ? body.publishedAt || new Date() : null,
    readTime: calculateReadTime(body.content),
    coverImage,
  });

  res.status(201).json({
    success: true,
    message: "Article created successfully",
    data: article,
  });
});

const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  const body = sanitizeValue(req.body);

  let nextSlug = article.slug;
  if (body.title && body.title !== article.title) {
    const baseSlug = slugify(body.title);
    nextSlug = await ensureUniqueSlug(Article, baseSlug, article._id);
  }

  let coverImage = article.coverImage;
  if (req.file) {
    if (article.coverImage?.publicId) {
      await deleteFromCloudinary(article.coverImage.publicId);
    }

    const uploaded = await uploadToCloudinary(req.file.path, "reena-gore/articles");
    coverImage = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  article.title = body.title || article.title;
  article.slug = nextSlug;
  article.excerpt = body.excerpt ?? article.excerpt;
  article.content = body.content || article.content;
  article.category = body.category || article.category;
  article.tags = Array.isArray(body.tags)
    ? body.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : typeof body.tags === "string"
    ? body.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : article.tags;
  article.authorName = body.authorName || article.authorName;
  article.seoTitle = body.seoTitle ?? article.seoTitle;
  article.seoDescription = body.seoDescription ?? article.seoDescription;
  article.featured =
    body.featured !== undefined
      ? body.featured === "true" || body.featured === true
      : article.featured;
  article.status = body.status || article.status;
  article.coverImage = coverImage;
  article.readTime = calculateReadTime(article.content);

  if (article.status === "published" && !article.publishedAt) {
    article.publishedAt = new Date();
  }

  if (body.publishedAt) {
    article.publishedAt = body.publishedAt;
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

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (article.coverImage?.publicId) {
    await deleteFromCloudinary(article.coverImage.publicId);
  }

  await article.deleteOne();

  res.status(200).json({
    success: true,
    message: "Article deleted successfully",
  });
});

module.exports = {
  getPublicArticles,
  getAdminArticles,
  getArticleBySlug,
  getAdminArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};