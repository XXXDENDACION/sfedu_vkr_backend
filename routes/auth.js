const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.post("/login", authController.login);
router.post("/registration", authController.registration);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

module.exports = router;
