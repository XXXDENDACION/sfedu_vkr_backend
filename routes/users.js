const express = require("express");
const roleController = require("../controllers/role-controller");
const skillController = require("../controllers/skill-controller");
const router = express.Router();
const usersController = require("../controllers/users-controller");

router.get("/", usersController.getAll);

router.get("/:companyId", usersController.getEmployeeFromCompany);

router.post("/", usersController.addUp);

router.put("/", usersController.patchUp);

router.post("/role", roleController.addRole);
router.post("/skill", skillController.addSkill);

module.exports = router;
