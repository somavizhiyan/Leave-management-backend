const {
  Createleaverequest,
  Getleaverequest,
  GetleaverequestById,
  Deleteleaverequest,
  Updateleaverequest,
} = require("../../controller/leaverequest.con");

const app = require("express").Router();

app.post("/addleaverequest", Createleaverequest);
app.get("/getleaverequest", Getleaverequest);
app.get("/getleaverequestbyid", GetleaverequestById);
app.delete("/deleteleaverequest/:id", Deleteleaverequest);
app.put("/updateleaverequest/:id", Updateleaverequest);


module.exports = app;
