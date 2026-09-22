const {
    Asset,
    Employee,
    AssetTransaction
} = require("../models");

exports.showIssueAsset = async (req, res) => {
    try {

        const assets = await Asset.findAll({
            where: {
                status: "Available"
            }
        });

        const employees = await Employee.findAll({
            where: {
                status: "Active"
            }
        });

        res.render("issueAsset", {
            assets,
            employees,
            message: req.query.message
        });

    } catch (error) {
        console.log(error.message);
        res.send("Error loading issue asset");
    }
};


exports.issueAsset = async (req, res) => {
    try {

        const {
            AssetId,
            EmployeeId,
            remarks
        } = req.body;

        const asset = await Asset.findByPk(AssetId);
        const employee = await Employee.findByPk(EmployeeId);

        if (!asset) {
            return res.send("Asset not found");
        }

        if (!employee) {
            return res.send("Employee not found");
        }

        if (asset.status !== "Available") {
            return res.send("Asset is not available");
        }

        await asset.update({
            status: "Issued"
        });

        await AssetTransaction.create({
            transaction_type: "Issue",
            transaction_date: new Date(),
            remarks: remarks,
            AssetId: AssetId,
            EmployeeId: EmployeeId
        });

        res.redirect(
            "/issue-asset?message=Asset issued to " +
            encodeURIComponent(employee.employee_name)
        );

    } catch (error) {
        console.log(error.message);
        res.send("Error issuing asset");
    }
};