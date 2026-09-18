const express = require("express");

const router = express.Router();

const assetCategoryController = require("../controllers/assetCategoryController");

console.log("Asset Category Routes Loaded");

router.get("/asset-categories", assetCategoryController.showCategory);

router.post("/asset-categories/add", assetCategoryController.addCategory);

module.exports = router;