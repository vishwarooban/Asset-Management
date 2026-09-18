const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")
const Asset=sequelize.define("Asset",{
    asset_unique_id:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    asset_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    model:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    serial_number:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    purchase_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    purchase_value:{
        type:DataTypes.DECIMAL,
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:"Available"
    }

});
module.exports=Asset;
