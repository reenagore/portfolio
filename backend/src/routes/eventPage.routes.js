const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const { protectAdmin, authorizeRoles } = require("../middleware/auth.middleware");
const {
  getPublicEvents,
  getAdminEvents,
  getPublicEventBySlug,
  getAdminEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventPage.controller");

const router = express.Router();

const createRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("status").optional().isIn(["draft", "published"]).withMessage("Invalid status"),
];

const updateRules = [
  body("title").optional().trim().isLength({ min: 3, max: 180 }),
  body("status").optional().isIn(["draft", "published"]).withMessage("Invalid status"),
];

router.get("/", getPublicEvents);
router.get("/admin/all", protectAdmin, getAdminEvents);
router.get("/admin/:id", protectAdmin, getAdminEventById);
router.get("/:slug", getPublicEventBySlug);

router.post(
  "/",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  createRules,
  validate,
  createEvent
);

router.put(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin", "editor"),
  updateRules,
  validate,
  updateEvent
);

router.delete(
  "/:id",
  protectAdmin,
  authorizeRoles("super_admin"),
  deleteEvent
);

module.exports = router;