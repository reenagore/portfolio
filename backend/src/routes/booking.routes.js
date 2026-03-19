const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { contactLimiter } = require("../middleware/rateLimit.middleware");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");
const {
  submitBooking,
  getAdminBookings,
  getAdminBookingById,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/booking.controller");

const router = express.Router();

const publicBookingValidationRules = [
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

  body("company")
    .optional()
    .trim()
    .isLength({ max: 120 })
    .withMessage("Company cannot exceed 120 characters"),

  body("phone")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Phone number cannot exceed 50 characters"),

  body("service")
    .trim()
    .notEmpty()
    .withMessage("Service is required")
    .isIn([
      "Profit Pulse Audit",
      "FPO Method Implementation",
      "Executive & Corporate Programs",
      "Strategy Consultation",
    ])
    .withMessage("Invalid service selected"),

  body("businessStage")
    .optional()
    .isIn([
      "Startup",
      "Early Growth",
      "Scaling SME",
      "Established Business",
      "Corporate / Institution",
      "",
    ])
    .withMessage("Invalid business stage"),

  body("annualRevenueRange")
    .optional()
    .isIn([
      "Below $100K",
      "$100K - $500K",
      "$500K - $2M",
      "$2M - $10M",
      "$10M+",
      "",
    ])
    .withMessage("Invalid revenue range"),

  body("preferredContactMethod")
    .optional()
    .isIn(["Email", "Phone", "WhatsApp", "Either"])
    .withMessage("Invalid preferred contact method"),

  body("preferredSessionType")
    .optional()
    .isIn(["Virtual", "In Person", "Either"])
    .withMessage("Invalid preferred session type"),

  body("preferredDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Preferred date must be a valid date"),

  body("preferredTime")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Preferred time cannot exceed 50 characters"),

  body("challengeSummary")
    .trim()
    .notEmpty()
    .withMessage("Challenge summary is required")
    .isLength({ min: 20, max: 5000 })
    .withMessage("Challenge summary must be between 20 and 5000 characters"),

  body("goals")
    .optional()
    .trim()
    .isLength({ max: 3000 })
    .withMessage("Goals cannot exceed 3000 characters"),

  body("source")
    .optional()
    .trim()
    .isLength({ max: 120 })
    .withMessage("Source cannot exceed 120 characters"),
];

const adminBookingUpdateValidationRules = [
  body("status")
    .optional()
    .isIn(["new", "reviewed", "contacted", "scheduled", "closed", "archived"])
    .withMessage("Invalid status"),

  body("internalNotes")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Internal notes cannot exceed 5000 characters"),
];

router.post("/", contactLimiter, publicBookingValidationRules, validate, submitBooking);

router.get(
  "/admin/all",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  getAdminBookings
);

router.get(
  "/admin/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  getAdminBookingById
);

router.patch(
  "/admin/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  adminBookingUpdateValidationRules,
  validate,
  updateBookingStatus
);

router.delete(
  "/admin/:id",
  protectAdmin,
  authorizeRoles("super_admin"),
  deleteBooking
);

module.exports = router;