const { Employee } = require("../models");
const { Op } = require("sequelize");

                           // SHOW AND VIEW EMPLOYEES

exports.showEmployeeForm = async (req, res) => {
    try {

        const status = req.query.status;
        const search = req.query.search;

        let where = {};

        if (status) {
            where.status = status;
        }

        if (search) {
            where[Op.or] = [
                {
                    employee_code: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                {
                    employee_name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            ];
        }

        const employees = await Employee.findAll({
            where: where
        });
        res.render("employee", {
            employees: employees,
            message: req.query.message
        });
    } catch (error) {
        console.log(error.message);
        res.send("error loading employees");
    }
};

                        // ADD EMPLOYEE

exports.addEmployee = async (req, res) => {
    try {

        const {employee_code, employee_name, email, phone} = req.body;
              
        //phone no 
        if (!/^[0-9]{10}$/.test(phone)) {
            return res.send("Phone number must contain exactly 10 digits");
             }
        // email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              return res.send("Please enter a valid email address");
             }
        await Employee.create({ employee_code, employee_name, email,phone,
            status: "Active"
        });

        console.log("EMPLOYEE ADDED SUCCESSFULLY");

        res.redirect(
            "/employees?message=" +
            encodeURIComponent("Employee added successfully")
        );

    } catch (error) {
        console.log(error.message);
        res.send("Error adding employee");
    }
};
                                // EDIT EMPLOYEE
exports.editEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(
            req.params.id
        );
        res.render("employeeEdit", {
            employee: employee
        });
    } catch (error) {
        console.log(error.message);
        res.send("error loading employee");
    }
};


                                // UPDATE EMPLOYEE

exports.updateEmployee = async (req, res) => {
    try {

        console.log("ID:", req.params.id);
        console.log("BODY:", req.body);

        const {
            employee_code,
            employee_name,
            email,
            phone,
            status
        } = req.body;

        await Employee.update(
            {
                employee_code: employee_code,
                employee_name: employee_name,
                email: email,
                phone: phone,
                status: status
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        console.log("Employee updated");
        res.redirect(
            "/employees?message=Employee updated successfully"
        );
    } catch (error) {
        console.log(
            "Update error: ",
            error.message
        );
        res.send(error.message);
    }
};
