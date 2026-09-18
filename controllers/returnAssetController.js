const { Asset, AssetTransaction } = require("../models");

            // Show Return Asset page
exports.showReturnAsset = async (req, res) => {
    try {
        const assets = await Asset.findAll({
            where: {
                status: "Issued"
            }
        });
        res.render("returnAsset", {
            assets: assets
        });
    } catch (error) {
        console.log(error.message);
        res.send("Error loading return asset");
    }
};


                            // Return Asset
exports.returnAsset = async (req, res) => {
    try {
        const { AssetId, remarks } = req.body;

                      // 1. Find asset
        const asset = await Asset.findByPk(AssetId);

        if (!asset) {
            return res.send("Asset not found");
        }

                     // 2. Check asset status
        if (asset.status !== "Issued") {
            return res.send("Asset is not issued");
        }

                      // 3. Asset status → Available
        await Asset.update(
            {
                status: "Available"
            },
            {
                where: {
                    id: AssetId
                }
            }
        );

                // 4. Create Return transaction
        await AssetTransaction.create({
            transaction_type: "Return",
            transaction_date: new Date(),
            remarks: remarks,
            AssetId: AssetId
        });
        res.redirect("/return-asset");
    } catch (error) {
        console.log(error.message);
        res.send("Error returning asset");
    }
};