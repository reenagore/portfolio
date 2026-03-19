const express = require("express");
const { body } = require("express-validator");
const upload = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");
const {
  getPublicPodcastEpisodes,
  getAdminPodcastEpisodes,
  getPodcastEpisodeBySlug,
  getAdminPodcastEpisodeById,
  createPodcastEpisode,
  updatePodcastEpisode,
  deletePodcastEpisode,
} = require("../controllers/podcast.controller");

const router = express.Router();

const createPodcastValidationRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 180 })
    .withMessage("Title must be between 5 and 180 characters"),

  body("summary")
    .optional()
    .trim()
    .isLength({ max: 1200 })
    .withMessage("Summary cannot exceed 1200 characters"),

  body("embedUrl")
    .trim()
    .notEmpty()
    .withMessage("Embed URL is required")
    .isURL()
    .withMessage("Embed URL must be a valid URL"),

  body("platform")
    .optional()
    .isIn(["youtube", "spotify", "apple", "soundcloud", "other"])
    .withMessage("Invalid platform"),

  body("duration")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Duration cannot exceed 50 characters"),

  body("seoTitle")
    .optional()
    .trim()
    .isLength({ max: 180 })
    .withMessage("SEO title cannot exceed 180 characters"),

  body("seoDescription")
    .optional()
    .trim()
    .isLength({ max: 320 })
    .withMessage("SEO description cannot exceed 320 characters"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Invalid status"),
];

const updatePodcastValidationRules = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 5, max: 180 })
    .withMessage("Title must be between 5 and 180 characters"),

  body("summary")
    .optional()
    .trim()
    .isLength({ max: 1200 })
    .withMessage("Summary cannot exceed 1200 characters"),

  body("embedUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("Embed URL must be a valid URL"),

  body("platform")
    .optional()
    .isIn(["youtube", "spotify", "apple", "soundcloud", "other"])
    .withMessage("Invalid platform"),

  body("duration")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Duration cannot exceed 50 characters"),

  body("seoTitle")
    .optional()
    .trim()
    .isLength({ max: 180 })
    .withMessage("SEO title cannot exceed 180 characters"),

  body("seoDescription")
    .optional()
    .trim()
    .isLength({ max: 320 })
    .withMessage("SEO description cannot exceed 320 characters"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Invalid status"),
];

router.get("/", getPublicPodcastEpisodes);
router.get("/:slug", getPodcastEpisodeBySlug);

router.get("/admin/all", protectAdmin, getAdminPodcastEpisodes);
router.get("/admin/:id", protectAdmin, getAdminPodcastEpisodeById);

router.post(
  "/",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  upload.single("thumbnail"),
  createPodcastValidationRules,
  validate,
  createPodcastEpisode
);

router.put(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  upload.single("thumbnail"),
  updatePodcastValidationRules,
  validate,
  updatePodcastEpisode
);

router.delete(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin"),
  deletePodcastEpisode
);

module.exports = router;