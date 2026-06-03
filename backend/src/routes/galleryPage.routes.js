const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const {
  getPublicGalleries,
  getPublicGalleryBySlug,
  getAdminGalleries,
  getAdminGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryPage.controller");

const router = express.Router();

router.get("/", getPublicGalleries);
router.get("/admin/all", protectAdmin, getAdminGalleries);
router.get("/admin/:id", protectAdmin, getAdminGalleryById);
router.get("/:slug", getPublicGalleryBySlug);

router.post(
  "/",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("status")
      .optional()
      .isIn(["draft", "published"])
      .withMessage("Invalid status"),
  ],
  validate,
  createGallery
);

router.put(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  [
    body("title")
      .optional()
      .trim()
      .isLength({ min: 3, max: 180 })
      .withMessage("Title must be between 3 and 180 characters"),
    body("status")
      .optional()
      .isIn(["draft", "published"])
      .withMessage("Invalid status"),
  ],
  validate,
  updateGallery
);

router.delete(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin"),
  deleteGallery
);

module.exports = router;