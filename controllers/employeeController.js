const { Employee } = require("../models");
const { Op }=require("sequelize");

            

             // show and view employees
exports.showEmployeeForm = async (req, res) => {
   try{
     const status =req.query.status;
     const search=req.query.search;

     console.log("status: ",status);
     console.log("search: ",search);
     let where={};
     if(status){
            where.status=status;
                
               }
    if(search){
        where[Op.or]=[
            {
              employee_code:{
                [Op.iLike]: `%${search}%`
              }
            },
            {
                employee_name:{
                    [Op.iLike]: `%${search}%`
                }
            }
        ];
    }
    const employees=await Employee.findAll({
            where: where
    });
     res.render("employee",{
        employees:employees
     });
   } catch(error){
    console.log(error.message);
    res.send("error loading employees");

   }
};
         

                            //   add employees
exports.addEmployee = async (req, res) => {
    try {
        const { employee_code, employee_name, email, phone } = req.body;
        await Employee.create({
            employee_code: employee_code,
            employee_name: employee_name,
            email: email,
            phone: phone
        });
        res.send("Employee added successfully");
    } catch (error) {
        console.log(error.message);
        res.send("Error adding employee");
    }
};
   
                              // edit employee
exports.editEmployee=async(req,res)=>{
     try{
        const employee=await Employee.findByPk(req.params.id);
        res.render("employeeEdit",{employee:employee}) ; 
     }
     catch(error){
        console.log(error.message);
        res.send("error loading employee");
     }
};



                             //   update employee
exports.updateEmployee=async(req,res)=>{
    try{
        console.log("ID:", req.params.id);
        console.log("BODY:", req.body);
        const{employee_code,employee_name,email,phone,status}=req.body;
        await Employee.update(
            {
            employee_code:employee_code,
            employee_name:employee_name,
            email:email,
            phone:phone,
            status:status   
           },
        {
            where:{
                id:req.params.id
            }
        }
     );
     console.log("Employee updated")
     res.redirect("/employees");
    }
    catch(error){
        console.log("Update error: ",error.message);
        res.send( error.message)
    }
};
