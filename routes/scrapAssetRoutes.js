const express = require("express");
const router = express.Router();
const scrapAssetController = require("../controllers/scrapAssetController");
router.get("/scrap-asset", scrapAssetController.showScrapAsset);
router.post("/scrap-asset/scrap", scrapAssetController.scrapAsset);
module.exports = router;