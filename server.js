const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
require("dotenv").config();

const bcrypt = require("bcrypt");
const User = require("./Models/users");

const app = express();
app.use(cors());
app.use(express.json());

const createAdminIfNotExists = async () => {
  try {
    const adminCount = await User.count({ where: { role: 1 } });

    if (adminCount == 0) {
      await User.bulkCreate(
        [
          {
            id: 1,
            role: 0,
            firstname: "Admin",
            lastname: "profile",
            email: "admin@example.com",
            newpassword: bcrypt.hashSync("Crackeradmin@1234", 10),
          },
        ],
        {
          ignoreDuplicates: true,
        }
      );

      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exist. No new admins created.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

createAdminIfNotExists();

app.use("/api/v1", require("./routes/index"));

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
