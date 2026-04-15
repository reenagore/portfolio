const express = require("express");
const { protectAdmin, authorizeRoles } = require("../middleware/auth.middleware");
const {
  getPublicEventGalleries,
  getPublicEventGalleryBySlug,
  getAdminEventGalleries,
  getAdminEventGalleryById,
  createEventGallery,
  updateEventGallery,
  deleteEventGallery,
} = require("../controllers/eventGallery.controller");

const router = express.Router();

router.get("/", getPublicEventGalleries);
router.get("/admin/all", protectAdmin, getAdminEventGalleries);
router.get("/admin/:id", protectAdmin, getAdminEventGalleryById);
router.get("/:slug", getPublicEventGalleryBySlug);

router.post("/", protectAdmin, authorizeRoles("super_admin", "editor"), createEventGallery);
router.put("/:id", protectAdmin, authorizeRoles("super_admin", "editor"), updateEventGallery);
router.delete("/:id", protectAdmin, authorizeRoles("super_admin"), deleteEventGallery);

module.exports = router;