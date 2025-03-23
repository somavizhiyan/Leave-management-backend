const app = require("express").Router();
const {
  CreateEmploye,
  UpdateEmploye,
  DeleteEmploye,
  GetEmploye,
  GetEmployeById,
} = require("../../controller/employe.con");

app.post("/addemploye", CreateEmploye);
app.get("/getemploye", GetEmploye);
app.get("/getemployebyid", GetEmployeById);
app.delete("/deleteemploye/:id", DeleteEmploye);
app.put("/updateemploye/:id", UpdateEmploye);
module.exports = app;
