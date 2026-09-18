const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");
const Employee=sequelize.define("Employee",{
     employee_code:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
     },
     employee_name:{
        type:DataTypes.STRING,
        allowNull:false
     },
     email:{
       type:DataTypes.STRING,
       allowNull:false 
     },
     phone:{
        type:DataTypes.STRING,
        allowNull:false
     },
     status:{
        type:DataTypes.STRING,
        defaultValue:"Active"
     }

});
module.exports=Employee;