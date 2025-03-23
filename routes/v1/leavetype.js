const app = require("express").Router();
const {
  GetLeaveType,
  CreateLeaveType,
  GetLeaveTypeById,
  DeleteLeaveType,
  UpdateLeaveType,
} = require("../../controller/leaveType.con");

app.post("/addleavetype", CreateLeaveType);
app.get("/getleavetype", GetLeaveType);
app.get("/getleavetypebyid", GetLeaveTypeById);
app.delete("/deleteleavetype/:id", DeleteLeaveType);
app.put("/updateleavetype/:id", UpdateLeaveType);

module.exports = app;
