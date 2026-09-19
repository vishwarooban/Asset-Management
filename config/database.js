const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL;

const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, {
        dialect: "postgres"
    })
    : new Sequelize(
        "asset_management",
        "postgres",
        "197rUw4KY9xGH6PBCentlU7fvLRKk8Si",
        {
            host: "localhost",
            port: 5432,
            dialect: "postgres"
        }
    );

module.exports = sequelize;