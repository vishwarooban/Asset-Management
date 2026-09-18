const express = require("express");

const router = express.Router();

const issueAssetController = require("../controllers/issueAssetController");

router.get("/issue-asset", issueAssetController.showIssueAsset);

router.post("/issue-asset/issue", issueAssetController.issueAsset);

module.exports = router;