const { Asset, Employee, AssetTransaction } = require("../models");

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
            assets: assets,
            employees: employees
        });

    } catch (error) {
        console.log(error.message);
        res.send("Error loading issue asset");
    }
};


exports.issueAsset = async (req, res) => {
    try {

        const { AssetId, EmployeeId, remarks } = req.body;

        // 1. Asset status check
        const asset = await Asset.findByPk(AssetId);

        if (!asset) {
            return res.send("Asset not found");
        }

        if (asset.status !== "Available") {
            return res.send("Asset is not available");
        }

        // 2. Asset status → Issued
        await Asset.update(
            {
                status: "Issued"
            },
            {
                where: {
                    id: AssetId
                }
            }
        );

        // 3. Create transaction
        await AssetTransaction.create({
            transaction_type: "Issue",
            transaction_date: new Date(),
            remarks: remarks,
            AssetId: AssetId,
            EmployeeId: EmployeeId
        });

        res.redirect("/issue-asset");

    } catch (error) {
        console.log(error.message);
        res.send("Error issuing asset");
    }
};