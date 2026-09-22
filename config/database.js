const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "asset_management",
    "postgres",
    "Vishwa0308",
    {
        host: "localhost",
        port: 5432,
        dialect: "postgres",
        logging: false
    }
);

module.exports = sequelize;