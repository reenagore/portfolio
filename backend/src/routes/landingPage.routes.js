const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");
const {
  getPublicLandingPages,
  getAdminLandingPages,
  getPublicLandingPageBySlug,
  getAdminLandingPageById,
  createLandingPage,
  updateLandingPage,
  deleteLandingPage,
} = require("../controllers/landingPage.controller");

const router = express.Router();

const createValidationRules = [
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["event", "product", "gallery"])
    .withMessage("Invalid landing page type"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 180 })
    .withMessage("Title must be between 3 and 180 characters"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Invalid status"),
];

const updateValidationRules = [
  body("type")
    .optional()
    .isIn(["event", "product", "gallery"])
    .withMessage("Invalid landing page type"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 180 })
    .withMessage("Title must be between 3 and 180 characters"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Invalid status"),
];

router.get("/", getPublicLandingPages);
router.get("/admin/all", protectAdmin, getAdminLandingPages);
router.get("/admin/:id", protectAdmin, getAdminLandingPageById);
router.get("/:slug", getPublicLandingPageBySlug);

router.post(
  "/",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  createValidationRules,
  validate,
  createLandingPage
);

router.put(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  updateValidationRules,
  validate,
  updateLandingPage
);

router.delete(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin"),
  deleteLandingPage
);

module.exports = router;