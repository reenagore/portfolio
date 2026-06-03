const express = require("express");
const upload = require("../middleware/upload.middleware");
const { uploadImage } = require("../controllers/upload.controller");
const {
  protectAdmin,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

const adminOnly = [protectAdmin, authorizeRoles("super_admin", "editor")];

router.post("/", ...adminOnly, upload.single("image"), uploadImage);

router.post("/image", ...adminOnly, upload.single("image"), uploadImage);

module.exports = router;