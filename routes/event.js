const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event-controller");

router.post("/", eventController.addEvent);
router.get("/:userId", eventController.getEventsByUser);

module.exports = router;
