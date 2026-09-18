const express = require("express");
const router = express.Router();
const assetHistoryController = require("../controllers/assetHistoryController");
router.get("/asset-history", assetHistoryController.showAssetHistory);
module.exports = router;