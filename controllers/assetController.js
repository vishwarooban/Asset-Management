const {
    Asset,
    AssetCategory,
    Branch
} = require("../models");

const { Op } = require("sequelize");


// ADD ASSET

exports.addAsset = async (req, res) => {
    try {

        const {
            asset_unique_id,
            asset_name,
            model,
            serial_number,
            purchase_date,
            purchase_value,
            AssetCategoryId,
            BranchId
        } = req.body;

        await Asset.create({
            asset_unique_id,
            asset_name,
            model,
            serial_number,
            purchase_date,
            purchase_value,
            AssetCategoryId,
            BranchId,
            status: "Available"
        });

        res.redirect(
            "/assets?message=Asset added successfully"
        );

    } catch (error) {

        res.status(500).send(
            "Error adding asset: " + error.message
        );
    }
};


// SHOW ASSETS

exports.showAssets = async (req, res) => {
    try {

        const search = req.query.search || "";
        const selectedCategory =
            req.query.category || "";

        const categories =
            await AssetCategory.findAll();

        const branches =
            await Branch.findAll();

        let where = {
            status: {
                [Op.ne]: "Scrapped"
            }
        };

        if (search) {

            where[Op.or] = [
                {
                    asset_unique_id: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                {
                    asset_name: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                {
                    model: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                {
                    serial_number: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            ];
        }

        if (selectedCategory) {
            where.AssetCategoryId =
                selectedCategory;
        }

        const assets = await Asset.findAll({
            where,

            include: [
                {
                    model: AssetCategory,
                    as: "category"
                },
                {
                    model: Branch
                }
            ],

            order: [["id", "DESC"]]
        });

        res.render("asset", {
            assets,
            branches,
            categories,
            search,
            selectedCategory,
            message: req.query.message
        });

    } catch (error) {

        res.status(500).send(
            "Error loading assets: " +
            error.message
        );
    }
};


// EDIT ASSET

exports.editAsset = async (req, res) => {
    try {

        const asset =
            await Asset.findByPk(req.params.id);

        if (!asset) {
            return res.send("Asset not found");
        }

        const categories =
            await AssetCategory.findAll();

        const branches =
            await Branch.findAll();

        res.render("assetEdit", {
            asset,
            categories,
            branches
        });

    } catch (error) {

        res.send("Error loading asset");
    }
};


// UPDATE ASSET

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
            BranchId,
            AssetCategoryId
        } = req.body;

        await Asset.update(
            {
                asset_unique_id,
                asset_name,
                model,
                serial_number,
                purchase_date,
                purchase_value,
                status,
                BranchId,
                AssetCategoryId
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        res.redirect(
            "/assets?message=Asset updated successfully"
        );

    } catch (error) {

        res.send("Error updating asset");
    }
};