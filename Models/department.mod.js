const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Department = sequelize.define("Department", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  DepartmentCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DepartmentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DepartmentShortName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Department;
