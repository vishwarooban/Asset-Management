const { AssetCategory, Asset } = require("../models");
//        show 
exports.showCategory = async (req, res) => {
    try {
        const categories = await AssetCategory.findAll();
        for (const category of categories) {
            const assetCount = await Asset.count({
                where: {
                    AssetCategoryId: category.id,
                    status: "Available"
                }
            });
            await AssetCategory.update(
                {
                    status: assetCount > 0 ? "Active" : "Inactive"
                },
                {
                    where: {
                        id: category.id
                    }
                }
            );
            category.status = assetCount > 0 ? "Active" : "Inactive";
        }
        res.render("assetCategory", {
            categories: categories
        });
    } catch (error) {
        console.log(error.message);
        res.send("Error loading categories");
    }
};
              //   add
exports.addCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        await AssetCategory.create({
            category_name: category_name
        });
        res.redirect("/asset-categories");
    } catch (error) {
        console.log(error.message);
        res.send("Error adding category");
    }
};