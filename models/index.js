const Branch=require("./Branch");
const Employee=require("./Employee");
const AssetCategory=require("./AssetCategory");
const Asset=require("./Asset");
const AssetTransaction=require("./AssetTransaction");


Branch.hasMany(Employee);
Employee.belongsTo(Branch);

Branch.hasMany(Asset);
Asset.belongsTo(Branch);

AssetCategory.hasMany(Asset, {
    foreignKey: "AssetCategoryId",
    as: "assets"
});

Asset.belongsTo(AssetCategory, {
    foreignKey: "AssetCategoryId",
    as: "category"
});

Asset.hasMany(AssetTransaction);
AssetTransaction.belongsTo(Asset);

Asset.hasMany(AssetTransaction);
AssetTransaction.belongsTo(Employee);

module.exports={Branch,Asset,AssetCategory,AssetTransaction,Employee};