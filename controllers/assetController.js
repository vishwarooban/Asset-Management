const { Asset, AssetCategory, Branch, AssetTransaction } = require("../models");
const { Op } = require("sequelize");
//                Show Assets
exports.showAssets = async (req, res) => {
    try {

        const model = req.query.model;

        let where = {};

        if (model) {
            where.model = {
                [Op.iLike]: `%${model}%`
            };
        }

        const assets = await Asset.findAll({
            where: where
        });

        const branches = await Branch.findAll();

        res.render("asset", {
            assets: assets,
            branches: branches
        });

    } catch (error) {
        console.log(error.message);
        res.send("Error loading assets");
    }
};
//                           Add Asset
exports.addAsset = async (req, res) => {
    try {
        const {
            asset_unique_id,
            asset_name,
            model,
            serial_number,
            purchase_date,
            purchase_value,
        
            BranchId
        } = req.body;
        const asset = await Asset.create({
            asset_unique_id: asset_unique_id,
            asset_name: asset_name,
            model: model,
            serial_number: serial_number,
            purchase_date: purchase_date,
            purchase_value: purchase_value,
            
            BranchId: BranchId
        });
        await AssetTransaction.create({
            transaction_type: "Purchase",
            transaction_date: purchase_date,
            remarks: "Asset purchased",
            AssetId: asset.id
    });
        res.redirect("/assets");
    } catch (error) {
        console.log(error.message);
        res.send("Error adding asset");
    }
};


//                 Edit Asset 
exports.editAsset = async (req, res) => {
    try {
        const asset = await Asset.findByPk(req.params.id);
        const categories = await AssetCategory.findAll();
        const branches = await Branch.findAll();
        res.render("assetEdit", {
            asset: asset,
            categories: categories,
            branches: branches
        });
    } catch (error) {
        console.log(error.message);
        res.send("Error loading asset");
    }
};


//                Update Asset
exports.updateAsset = async (req, res) => {
    try {
        const {
            asset_unique_id,
            asset_name,
            model,
            serial_number,
            purchase_date,
            purchase_value,
          
            status,
            BranchId
        } = req.body;
        await Asset.update(
            {
                asset_unique_id: asset_unique_id,
                asset_name: asset_name,
                model: model,
                serial_number: serial_number,
                purchase_date: purchase_date,
                purchase_value: purchase_value,
        
                status: status,
                BranchId: BranchId,
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.redirect("/assets");
    
    } catch (error) {
        console.log(error.message);
        res.send("Error updating asset");
    }
};