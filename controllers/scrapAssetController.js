const {
    Asset,
    AssetTransaction
} = require("../models");

exports.showScrapAsset = async (req, res) => {
    try {

        const assets = await Asset.findAll({
            where: {
                status: "Available"
            }
        });

        res.render("scrapAsset", {
            assets,
            message: req.query.message
        });

    } catch (error) {
        console.log(error.message);
        res.send("Error loading scrap asset");
    }
};


exports.scrapAsset = async (req, res) => {
    try {

        const {
            AssetId,
            remarks
        } = req.body;

        const asset = await Asset.findByPk(AssetId);

        if (!asset) {
            return res.send("Asset not found");
        }

        if (asset.status !== "Available") {
            return res.send(
                "Only available assets can be scrapped"
            );
        }

        await asset.update({
            status: "Scrapped"
        });

        await AssetTransaction.create({
            transaction_type: "Scrap",
            transaction_date: new Date(),
            remarks: remarks,
            AssetId: AssetId
        });

        res.redirect(
            "/scrap-asset?message=Asset scrapped successfully"
        );

    } catch (error) {
        console.log(error.message);
        res.send("Error scrapping asset");
    }
};