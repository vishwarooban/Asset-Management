const { Asset, Branch } = require("../models");

exports.showStock = async (req, res) => {
    try {

        const assets = await Asset.findAll({
            where: {
                status: "Available"
            },
            include: [
                {
                    model: Branch
                }
            ]
        });

        let stock = {};

        let grandTotalAssets = 0;
        let grandTotalValue = 0;

        assets.forEach(asset => {

            const branchName = asset.Branch
                ? asset.Branch.branch_name
                : "No Branch";

            if (!stock[branchName]) {
                stock[branchName] = {
                    totalAssets: 0,
                    totalValue: 0
                };
            }

            const value = Number(asset.purchase_value);

            stock[branchName].totalAssets++;
            stock[branchName].totalValue += value;

            grandTotalAssets++;
            grandTotalValue += value;
        });

        res.render("stock", {
            assets,
            stock,
            grandTotalAssets,
            grandTotalValue
        });

    } catch (error) {
        console.log(error.message);
        res.send("Error loading stock");
    }
};