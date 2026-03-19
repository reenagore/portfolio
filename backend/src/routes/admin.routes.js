const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { authLimiter } = require("../middleware/rateLimit.middleware");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
  getAllAdmins,
} = require("../controllers/admin.controller");

const router = express.Router();

const baseAdminValidation = [
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

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters"),
];


router.post(
  "/login",
  authLimiter,
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  loginAdmin
);

router.post("/logout", protectAdmin, logoutAdmin);
router.get("/me", protectAdmin, getCurrentAdmin);

router.get(
  "/",
  protectAdmin,
  authorizeRoles("super_admin"),
  getAllAdmins
);

// router.post(
//   "/",
//   protectAdmin,
//   authorizeRoles("super_admin"),
//   [
//     ...baseAdminValidation,
//     body("role")
//       .optional()
//       .isIn(["super_admin", "editor"])
//       .withMessage("Invalid role"),
//   ],
//   validate,
//   createEditorAdmin
// );

module.exports = router;