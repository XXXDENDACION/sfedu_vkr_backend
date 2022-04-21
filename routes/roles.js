const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role-controller");

router.post("/", roleController.addRole);

module.exports = router;