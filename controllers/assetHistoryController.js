const { Asset, AssetTransaction, Employee } = require("../models");

                       // Show Asset History
exports.showAssetHistory = async (req, res) => {
    try {
        const assets = await Asset.findAll({
            include: [
                {
                    model: AssetTransaction,
                    include: [
                        {
                            model: Employee
                        }
                    ]
                }
            ]
        });
        res.render("assetHistory", {
            assets: assets
        });
    } catch (error) {
        console.log(error.message);
        res.send("Error loading asset history");
    }
};