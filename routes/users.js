const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controller");

router.get("/", usersController.getAll);
router.get("/filters/:companyId", usersController.getFilters);

router.post("/:companyId", usersController.getEmployeeFromCompany);

router.post("/", usersController.addUp);

router.put("/", usersController.patchUp);

module.exports = router;
