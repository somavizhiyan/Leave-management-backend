const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const LeaveType = sequelize.define("LeaveType", {
  leavetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leavedescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = LeaveType;
