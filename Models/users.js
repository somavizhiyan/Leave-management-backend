const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    newpassword:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    }
})

module.exports = User