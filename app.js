const express = require("express");
const path = require("path");
const sequelize = require("./config/database");
require("./models");
//     connecting app.js with routes
const employeeRoutes = require("./routes/employeeRoutes");
const assetCategoryRoutes=require("./routes/assetCategoryRoutes"); 
const assetRoutes = require("./routes/assetRoutes");
const stockRoutes = require("./routes/stockRoutes");
const issueAssetRoutes = require("./routes/issueAssetRoutes");
const returnAssetRoutes = require("./routes/returnAssetRoutes");
const scrapAssetRoutes = require("./routes/scrapAssetRoutes");
const assetHistoryRoutes = require("./routes/assetHistoryRoutes");

const app = express();
app.get("/css/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "css", "style.css"));
});

app.set("view engine", "jade");
app.use(express.urlencoded({extended:true}));

app.use("/", employeeRoutes);
app.use("/", assetCategoryRoutes);
app.use("/", assetRoutes);
app.use("/", stockRoutes);
app.use("/", issueAssetRoutes);
app.use("/", returnAssetRoutes);
app.use("/", scrapAssetRoutes);
app.use("/", assetHistoryRoutes);

app.get("/", (req, res) => {
    res.send("Asset Management System");
});
sequelize.authenticate()
    .then(() => {
        console.log("PostgreSQL connected successfully");
        return sequelize.sync();
    })
    .then(()=>{
        console.log("Tables Created Successfully");
    })
    .catch((error) => {
        console.log("Database connection failed");
        console.log(error.message);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});