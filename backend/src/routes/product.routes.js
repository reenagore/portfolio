const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { protectAdmin, authorizeRoles } = require("../middleware/auth.middleware");
const {
  getPublicProducts,
  getAdminProducts,
  getPublicProductBySlug,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

const createRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("status").optional().isIn(["draft", "published"]).withMessage("Invalid status"),
];

const updateRules = [
  body("title").optional().trim().isLength({ min: 3, max: 180 }),
  body("status").optional().isIn(["draft", "published"]).withMessage("Invalid status"),
];


router.get("/", getPublicProducts);
router.get("/admin/all", protectAdmin, getAdminProducts);
router.get("/admin/:id", protectAdmin, getAdminProductById);
router.get("/:slug", getPublicProductBySlug);

router.post("/", protectAdmin, authorizeRoles("super_admin", "editor"), createRules, validate, createProduct);
router.put("/:id", protectAdmin, authorizeRoles("super_admin", "editor"), updateRules, validate, updateProduct);
router.delete("/:id", protectAdmin, authorizeRoles("super_admin"), deleteProduct);

module.exports = router;