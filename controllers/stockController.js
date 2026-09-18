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
            stock[branchName].totalAssets++;
            stock[branchName].totalValue +=
                Number(asset.purchase_value);
        });
        res.render("stock", {
            assets: assets,
            stock: stock
        });
    } catch (error) {
        console.log(error.message);
        res.send("Error loading stock");
    }
};