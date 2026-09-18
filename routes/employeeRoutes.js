const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
router.get("/employees", employeeController.showEmployeeForm);
router.post("/employees/add", employeeController.addEmployee);
router.get("/employees/edit/:id",employeeController.editEmployee);
router.post("/employees/update/:id",employeeController.updateEmployee);
module.exports = router;