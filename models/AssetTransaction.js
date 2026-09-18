const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");
const AssetTransaction=sequelize.define("AssetTransaction",{
    transaction_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    transaction_date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    remarks:{
        type:DataTypes.STRING
    }
});
module.exports=AssetTransaction;