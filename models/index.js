const Branch = require("./Branch");
const Employee = require("./Employee");
const AssetCategory = require("./AssetCategory");
const Asset = require("./Asset");
const AssetTransaction = require("./AssetTransaction");

Branch.hasMany(Employee, {
    foreignKey: "BranchId"
});

Employee.belongsTo(Branch, {
    foreignKey: "BranchId"
});

Branch.hasMany(Asset, {
    foreignKey: "BranchId"
});

Asset.belongsTo(Branch, {
    foreignKey: "BranchId"
});

AssetCategory.hasMany(Asset, {
    foreignKey: "AssetCategoryId",
    as: "assets"
});

Asset.belongsTo(AssetCategory, {
    foreignKey: "AssetCategoryId",
    as: "category"
});

Asset.hasMany(AssetTransaction, {
    foreignKey: "AssetId",
    as: "transactions"
});

AssetTransaction.belongsTo(Asset, {
    foreignKey: "AssetId"
});

Employee.hasMany(AssetTransaction, {
    foreignKey: "EmployeeId",
    as: "transactions"
});

AssetTransaction.belongsTo(Employee, {
    foreignKey: "EmployeeId"
});

module.exports = {
    Branch,
    Asset,
    AssetCategory,
    AssetTransaction,
    Employee
};