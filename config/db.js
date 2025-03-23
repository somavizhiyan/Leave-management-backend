const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  "root",
  process.env.DB_PASS,
  {
    host: process.env.HOST,
    dialect: "mysql",
    logging: console.log,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL using Sequelize!");
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
};
connectDB();
module.exports = sequelize;
