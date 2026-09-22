const { Asset, AssetTransaction, Employee } = require("../models");

exports.showAssetHistory = async (req, res) => {
    try {

        const assets = await Asset.findAll({
            include: [
                {
                    model: AssetTransaction,
                    as: "transactions",
                    include: [
                        {
                            model: Employee
                        }
                    ]
                }
            ],
            order: [["id", "DESC"]]
        });

        res.render("assetHistory", {
            assets
        });

    } catch (error) {
        console.log(error.message);
        res.send("Error loading asset history");
    }
};