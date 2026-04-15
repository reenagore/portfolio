const express = require("express");
const { loginAdmin, logoutAdmin, getCurrentAdmin } = require("../controllers/admin.controller");
const { protectAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protectAdmin, getCurrentAdmin);

module.exports = router;