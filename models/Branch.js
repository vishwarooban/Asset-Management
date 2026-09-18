const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");
const Branch=sequelize.define("Branch",{
    branch_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    }
});
module.exports=Branch;