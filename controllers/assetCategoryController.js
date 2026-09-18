const { AssetCategory } = require("../models");

          // show categories
exports.showCategory = async (req, res) => {
    try {
        const categories = await AssetCategory.findAll();
        res.render("assetCategory", {
            categories: categories
        });
    } catch (error) {
        console.log(error.message);
        res.send("Error loading categories");
    }
};


                 // add category
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