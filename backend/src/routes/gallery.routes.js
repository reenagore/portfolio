const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { protectAdmin, authorizeRoles } = require("../middleware/auth.middleware");
const {
  getPublicGalleries,
  getAdminGalleries,
  getPublicGalleryBySlug,
  getAdminGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/gallery.controller");

const router = express.Router();

const createRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("status").optional().isIn(["draft", "published"]).withMessage("Invalid status"),
];

const updateRules = [
  body("title").optional().trim().isLength({ min: 3, max: 180 }),
  body("status").optional().isIn(["draft", "published"]).withMessage("Invalid status"),
];

router.get("/", getPublicGalleries);
router.get("/admin/all", protectAdmin, getAdminGalleries);
router.get("/admin/:id", protectAdmin, getAdminGalleryById);
router.get("/:slug", getPublicGalleryBySlug);

router.post("/", protectAdmin, authorizeRoles("super_admin", "editor"), createRules, validate, createGallery);
router.put("/:id", protectAdmin, authorizeRoles("super_admin", "editor"), updateRules, validate, updateGallery);
router.delete("/:id", protectAdmin, authorizeRoles("super_admin"), deleteGallery);

module.exports = router;