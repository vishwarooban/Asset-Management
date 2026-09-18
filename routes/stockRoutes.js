const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
router.get("/stock", stockController.showStock);
module.exports = router;