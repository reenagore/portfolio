const express = require("express");
const { getHealth } = require("../controllers/healthHandle.controller");

const router = express.Router();

router.get("/", getHealth);

module.exports = router;