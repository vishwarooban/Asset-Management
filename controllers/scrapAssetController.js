const { Asset, AssetTransaction } = require("../models");

                    // Show Scrap Asset page
exports.showScrapAsset = async (req, res) => {
    try {
        const assets = await Asset.findAll({
            where: {
                status: "Available"
            }
        });
        res.render("scrapAsset", {
            assets: assets
        });
    } catch (error) {
        console.log(error.message);
        res.send("Error loading scrap asset");
    }
};


                          // Scrap Asset
exports.scrapAsset = async (req, res) => {
    try {
        const { AssetId, remarks } = req.body;

                     // 1. Find asset
        const asset = await Asset.findByPk(AssetId);
        if (!asset) {
            return res.send("Asset not found");
        }

                  // 2. Check asset status
        if (asset.status !== "Available") {
            return res.send("Only available assets can be scrapped");
        }

                  // 3. Asset status → Scrapped
        await Asset.update(
            {
                status: "Scrapped"
            },
            {
                where: {
                    id: AssetId
                }
            }
        );

                      // 4. Create Scrap transaction
        await AssetTransaction.create({
            transaction_type: "Scrap",
            transaction_date: new Date(),
            remarks: remarks,
            AssetId: AssetId
        });
        res.redirect("/scrap-asset");
    } catch (error) {
        console.log(error.message);
        res.send("Error scrapping asset");
    }
};