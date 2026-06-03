const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { protectAdmin, authorizeRoles } = require("../middleware/auth.middleware");

const {
  getPublicArticles,
  getPublicArticleBySlug,
  getAdminArticles,
  getAdminArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/article.controller");

const router = express.Router();

router.get("/", getPublicArticles);
router.get("/admin/all", protectAdmin, getAdminArticles);
router.get("/admin/:id", protectAdmin, getAdminArticleById);
router.get("/:slug", getPublicArticleBySlug);

router.post(
  "/",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  validate,
  createArticle
);

router.put(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  [
    body("title").optional().trim().isLength({ min: 3, max: 180 }),
    body("content").optional().notEmpty(),
  ],
  validate,
  updateArticle
);

router.delete(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin"),
  deleteArticle
);

module.exports = router;