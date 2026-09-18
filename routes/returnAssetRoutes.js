const express = require("express");
const router = express.Router();
const returnAssetController = require("../controllers/returnAssetController")
router.get("/return-asset", returnAssetController.showReturnAsset);
router.post("/return-asset/return", returnAssetController.returnAsset);
module.exports = router;