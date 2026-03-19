const express = require("express");
const { body } = require("express-validator");
const { submitContactForm } = require("../controllers/contact.controller");
const validate = require("../middleware/validate.middleware");
const { contactLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

router.post(
  "/",
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
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    body("company")
      .optional()
      .trim()
      .isLength({ max: 120 })
      .withMessage("Company cannot exceed 120 characters"),

    body("subject")
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage("Subject cannot exceed 200 characters"),

    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ min: 10, max: 5000 })
      .withMessage("Message must be between 10 and 5000 characters"),
  ],
  validate,
  submitContactForm
);

module.exports = router;