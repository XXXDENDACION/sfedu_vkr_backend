const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill-controller");

router.post("/", skillController.addSkill);

module.exports = router;
