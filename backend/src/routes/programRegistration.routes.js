const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { contactLimiter } = require("../middleware/rateLimit.middleware");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");
const {
  submitProgramRegistration,
  getAdminProgramRegistrations,
  getAdminProgramRegistrationById,
  updateProgramRegistrationStatus,
} = require("../controllers/programRegistration.controller");

const router = express.Router();

router.post(
  "/",
  contactLimiter,
  [
    body("programTitle")
      .trim()
      .notEmpty()
      .withMessage("Program title is required")
      .isLength({ min: 3, max: 180 })
      .withMessage("Program title must be between 3 and 180 characters"),

    body("programSlug")
      .trim()
      .notEmpty()
      .withMessage("Program slug is required")
      .isLength({ min: 3, max: 180 })
      .withMessage("Program slug must be between 3 and 180 characters"),

    body("fullName")
      .trim()
      .notEmpty()
      .withMessage("Full name is required")
      .isLength({ min: 2, max: 120 })
      .withMessage("Full name must be between 2 and 120 characters"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    body("phone")
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage("Phone cannot exceed 50 characters"),

    body("company")
      .optional()
      .trim()
      .isLength({ max: 120 })
      .withMessage("Company cannot exceed 120 characters"),

    body("role")
      .optional()
      .trim()
      .isLength({ max: 120 })
      .withMessage("Role cannot exceed 120 characters"),

    body("message")
      .optional()
      .trim()
      .isLength({ max: 3000 })
      .withMessage("Message cannot exceed 3000 characters"),
  ],
  validate,
  submitProgramRegistration
);

router.get(
  "/admin/all",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  getAdminProgramRegistrations
);

router.get(
  "/admin/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  getAdminProgramRegistrationById
);

router.patch(
  "/admin/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  [
    body("status")
      .optional()
      .isIn(["new", "reviewed", "contacted", "confirmed", "archived"])
      .withMessage("Invalid status"),
  ],
  validate,
  updateProgramRegistrationStatus
);

module.exports = router;