const {
    Asset,
    AssetTransaction,
    Employee
} = require("../models");

exports.showReturnAsset = async (req, res) => {
    try {

        const assets = await Asset.findAll({
            where: {
                status: "Issued"
            },
            include: [
                {
                    model: AssetTransaction,
                    as: "transactions",
                    where: {
                        transaction_type: "Issue"
                    },
                    required: false,
                    include: [
                        {
                            model: Employee
                        }
                    ]
                }
            ]
        });

        res.render("returnAsset", {
            assets,
            message: req.query.message
        });

    } catch (error) {
        console.log(error.message);
        res.send("Error loading return asset");
    }
};


exports.returnAsset = async (req, res) => {
    try {

        const {
            AssetId,
            remarks
        } = req.body;

        const asset = await Asset.findByPk(AssetId);

        if (!asset) {
            return res.send("Asset not found");
        }

        if (asset.status !== "Issued") {
            return res.send("Asset is not issued");
        }

        const issueTransaction = await AssetTransaction.findOne({
            where: {
                AssetId: AssetId,
                transaction_type: "Issue"
            },
            include: [
                {
                    model: Employee
                }
            ],
            order: [["transaction_date", "DESC"]]
        });

        await asset.update({
            status: "Available"
        });

        await AssetTransaction.create({
            transaction_type: "Return",
            transaction_date: new Date(),
            remarks: remarks,
            AssetId: AssetId,
            EmployeeId: issueTransaction
                ? issueTransaction.EmployeeId
                : null
        });

        const employeeName =
            issueTransaction && issueTransaction.Employee
                ? issueTransaction.Employee.employee_name
                : "Employee";

        res.redirect(
            "/return-asset?message=Asset returned by " +
            encodeURIComponent(employeeName)
        );

    } catch (error) {
        console.log(error.message);
        res.send("Error returning asset");
    }
};