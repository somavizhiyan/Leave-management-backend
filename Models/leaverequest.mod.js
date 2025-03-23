const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const LeaveRequest = sequelize.define("LeaveRequest", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  leavetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fromdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  todate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  shortreason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empDepartment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empstatus: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = LeaveRequest;
