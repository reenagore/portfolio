const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { contactLimiter } = require("../middleware/rateLimit.middleware");
const { protectAdmin, authorizeRoles } = require("../middleware/auth.middleware");
const {
  initiateProgrammeOrder,
  verifyProgrammeOrder,
  getAdminProgrammeOrders,
} = require("../controllers/program.controller");

const router = express.Router();

router.post(
  "/initiate",
  contactLimiter,
  [
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
      .withMessage("Valid email is required")
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
  ],
  validate,
  initiateProgrammeOrder
);

router.get("/verify", verifyProgrammeOrder);

router.get(
  "/admin/all",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  getAdminProgrammeOrders
);

module.exports = router;