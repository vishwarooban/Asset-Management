const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
router.get("/assets", assetController.showAssets);
router.post("/assets/add", assetController.addAsset);
router.get("/assets/edit/:id", assetController.editAsset);
router.post("/assets/update/:id", assetController.updateAsset);
module.exports = router;