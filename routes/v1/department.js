const app = require("express").Router();
const {
  Createdepartment,
  Getdepartment,
  Deletedepartment,
  GetdepartmentById,
  Updatedepartment,
} = require("../../controller/department.con");

app.post("/adddepartment", Createdepartment);
app.get("/getdepartment", Getdepartment);
app.get("/getdepartmentbyid",GetdepartmentById)
app.delete("/deletedepartment/:id",Deletedepartment)
app.put("/updatedepartment/:id",Updatedepartment)
module.exports = app;
