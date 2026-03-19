const PodcastEpisode = require("../models/PodcastEpisode");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { sanitizeValue } = require("../utils/sanitize");
const slugify = require("../utils/slugify");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../services/cloudinary.service");

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

const getPublicPodcastEpisodes = asyncHandler(async (req, res) => {
  const { featured, platform, limit = 20, page = 1, search = "" } = req.query;

  const query = {
    status: "published",
  };

  if (featured === "true") {
    query.featured = true;
  }

  if (platform) {
    query.platform = platform;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const safeLimit = Math.min(Number(limit) || 20, 50);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const [episodes, total] = await Promise.all([
    PodcastEpisode.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(safeLimit),
    PodcastEpisode.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: episodes,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  });
});

const getAdminPodcastEpisodes = asyncHandler(async (req, res) => {
  const { status, platform, search = "" } = req.query;

  const query = {};

  if (status) query.status = status;
  if (platform) query.platform = platform;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
    ];
  }

  const episodes = await PodcastEpisode.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: episodes,
  });
});

const getPodcastEpisodeBySlug = asyncHandler(async (req, res) => {
  const episode = await PodcastEpisode.findOne({
    slug: req.params.slug,
    status: "published",
  });

  if (!episode) {
    throw new ApiError(404, "Podcast episode not found");
  }

  res.status(200).json({
    success: true,
    data: episode,
  });
});

const getAdminPodcastEpisodeById = asyncHandler(async (req, res) => {
  const episode = await PodcastEpisode.findById(req.params.id);

  if (!episode) {
    throw new ApiError(404, "Podcast episode not found");
  }

  res.status(200).json({
    success: true,
    data: episode,
  });
});

const createPodcastEpisode = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const baseSlug = slugify(body.title);
  if (!baseSlug) {
    throw new ApiError(400, "A valid title is required to generate slug");
  }

  const slug = await ensureUniqueSlug(PodcastEpisode, baseSlug);
  let thumbnail = { url: "", publicId: "" };

  if (req.file) {
    const uploaded = await uploadToCloudinary(req.file.path, "reena-gore/podcasts");
    thumbnail = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  const episode = await PodcastEpisode.create({
    title: body.title,
    slug,
    summary: body.summary || "",
    description: body.description || "",
    embedUrl: body.embedUrl,
    platform: body.platform || "youtube",
    duration: body.duration || "",
    featured: body.featured === "true" || body.featured === true,
    episodeNumber: body.episodeNumber ? Number(body.episodeNumber) : null,
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    status: body.status || "draft",
    publishedAt:
      body.status === "published" ? body.publishedAt || new Date() : null,
    thumbnail,
  });

  res.status(201).json({
    success: true,
    message: "Podcast episode created successfully",
    data: episode,
  });
});

const updatePodcastEpisode = asyncHandler(async (req, res) => {
  const episode = await PodcastEpisode.findById(req.params.id);

  if (!episode) {
    throw new ApiError(404, "Podcast episode not found");
  }

  const body = sanitizeValue(req.body);

  let nextSlug = episode.slug;
  if (body.title && body.title !== episode.title) {
    const baseSlug = slugify(body.title);
    nextSlug = await ensureUniqueSlug(PodcastEpisode, baseSlug, episode._id);
  }

  let thumbnail = episode.thumbnail;
  if (req.file) {
    if (episode.thumbnail?.publicId) {
      await deleteFromCloudinary(episode.thumbnail.publicId);
    }

    const uploaded = await uploadToCloudinary(req.file.path, "reena-gore/podcasts");
    thumbnail = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  episode.title = body.title || episode.title;
  episode.slug = nextSlug;
  episode.summary = body.summary ?? episode.summary;
  episode.description = body.description ?? episode.description;
  episode.embedUrl = body.embedUrl || episode.embedUrl;
  episode.platform = body.platform || episode.platform;
  episode.duration = body.duration ?? episode.duration;
  episode.featured =
    body.featured !== undefined
      ? body.featured === "true" || body.featured === true
      : episode.featured;
  episode.episodeNumber =
    body.episodeNumber !== undefined
      ? Number(body.episodeNumber) || null
      : episode.episodeNumber;
  episode.seoTitle = body.seoTitle ?? episode.seoTitle;
  episode.seoDescription = body.seoDescription ?? episode.seoDescription;
  episode.status = body.status || episode.status;
  episode.thumbnail = thumbnail;

  if (episode.status === "published" && !episode.publishedAt) {
    episode.publishedAt = new Date();
  }

  if (body.publishedAt) {
    episode.publishedAt = body.publishedAt;
  }

  await episode.save();

  res.status(200).json({
    success: true,
    message: "Podcast episode updated successfully",
    data: episode,
  });
});

const deletePodcastEpisode = asyncHandler(async (req, res) => {
  const episode = await PodcastEpisode.findById(req.params.id);

  if (!episode) {
    throw new ApiError(404, "Podcast episode not found");
  }

  if (episode.thumbnail?.publicId) {
    await deleteFromCloudinary(episode.thumbnail.publicId);
  }

  await episode.deleteOne();

  res.status(200).json({
    success: true,
    message: "Podcast episode deleted successfully",
  });
});

module.exports = {
  getPublicPodcastEpisodes,
  getAdminPodcastEpisodes,
  getPodcastEpisodeBySlug,
  getAdminPodcastEpisodeById,
  createPodcastEpisode,
  updatePodcastEpisode,
  deletePodcastEpisode,
};