const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");
const {
  initializePayment,
  verifyPaymentByReference,
  handlePaystackWebhook,
  getAdminPayments,
  getAdminPaymentById,
} = require("../controllers/payment.controller");

const router = express.Router();

router.post(
  "/initialize",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("A valid email is required")
      .normalizeEmail(),

    body("fullName")
      .optional()
      .trim()
      .isLength({ max: 120 })
      .withMessage("Full name cannot exceed 120 characters"),

    body("amount")
      .notEmpty()
      .withMessage("Amount is required")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),

    body("currency")
      .optional()
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage("Currency must be a 3-letter code"),

    body("purpose")
      .optional()
      .isIn(["consultation", "program", "audit", "implementation", "custom"])
      .withMessage("Invalid payment purpose"),

    body("service")
      .optional()
      .trim()
      .isLength({ max: 120 })
      .withMessage("Service cannot exceed 120 characters"),

    body("bookingId")
      .optional()
      .isMongoId()
      .withMessage("bookingId must be a valid MongoDB ID"),

    body("callbackUrl")
      .optional()
      .isURL()
      .withMessage("callbackUrl must be a valid URL"),
  ],
  validate,
  initializePayment
);

router.get("/verify/:reference", verifyPaymentByReference);
router.post("/webhook", handlePaystackWebhook);

router.get(
  "/admin/all",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  getAdminPayments
);

router.get(
  "/admin/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  getAdminPaymentById
);

module.exports = router;