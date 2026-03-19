const express = require("express");
const { body } = require("express-validator");
const upload = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");
const {
  getPublicArticles,
  getAdminArticles,
  getArticleBySlug,
  getAdminArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/article.controller");

const router = express.Router();

const articleValidationRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 180 })
    .withMessage("Title must be between 5 and 180 characters"),

  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 400 })
    .withMessage("Excerpt cannot exceed 400 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 50 })
    .withMessage("Content must be at least 50 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Financial Systems & Cashflow",
      "Leadership & Decision-Making",
      "Operations & Efficiency",
      "SME Growth Strategy",
      "Market & Economic Insights",
    ])
    .withMessage("Invalid category"),

  body("authorName")
    .optional()
    .trim()
    .isLength({ max: 120 })
    .withMessage("Author name cannot exceed 120 characters"),

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

router.get("/", getPublicArticles);
router.get("/admin/all", getAdminArticles);
router.get("/admin/:id", getAdminArticleById);
router.get("/:slug", getArticleBySlug);

router.post(
  "/",
  upload.single("coverImage"),
  articleValidationRules,
  validate,
  createArticle
);

router.put(
  "/:id",
  upload.single("coverImage"),
  articleValidationRules,
  validate,
  updateArticle
);

router.delete("/:id", deleteArticle);

module.exports = router;