const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { contactLimiter } = require("../middleware/rateLimit.middleware");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");
const {
  createBookPreorder,
  getAdminBookPreorders,
  updateBookPreorderStatus,
} = require("../controllers/preoder.controller");

const router = express.Router();

router.post(
  "/",
  contactLimiter,
  [
    body("bookTitle")
      .optional()
      .trim()
      .isLength({ min: 3, max: 180 })
      .withMessage("Book title must be between 3 and 180 characters"),

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

    body("quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),

    body("amount")
      .notEmpty()
      .withMessage("Amount is required")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),
  ],
  validate,
  createBookPreorder
);

router.get(
  "/admin/all",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  getAdminBookPreorders
);

router.patch(
  "/admin/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  [
    body("status")
      .optional()
      .isIn(["new", "reviewed", "confirmed", "fulfilled", "archived"])
      .withMessage("Invalid status"),
    body("paymentStatus")
      .optional()
      .isIn(["pending", "paid", "failed"])
      .withMessage("Invalid payment status"),
  ],
  validate,
  updateBookPreorderStatus
);

module.exports = router;