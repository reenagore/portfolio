const express = require("express");
const {
  submitContact,
  getContacts,
  updateContactStatus,
} = require("../controllers/contact.controller");

const { protectAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", submitContact);

router.get("/admin", protectAdmin, getContacts);

router.patch("/admin/:id", protectAdmin, updateContactStatus);

module.exports = router;