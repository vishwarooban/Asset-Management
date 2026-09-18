const { DataTypes } = require("sequelize")

const sequelize=require("../config/database");
const AssetCategory=sequelize.define("AssetCategory",{
    category_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:"Active"
    }
});
module.exports=AssetCategory;
