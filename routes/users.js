const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/", usersController.getAll);
router.get("/filters/:companyId", usersController.getFilters);

router.get("/:id", usersController.getDetailsEmployee);
router.post("/:companyId", usersController.getEmployeeFromCompany);

router.post("/", usersController.addUp);

router.put("/", usersController.patchUp);

module.exports = router;
