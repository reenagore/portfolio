const express = require("express");
const upload = require("../middleware/upload.middleware");
const { uploadImage } = require("../controllers/upload.controller");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  upload.single("image"),
  uploadImage
);

module.exports = router;