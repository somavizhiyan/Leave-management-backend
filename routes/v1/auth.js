const {
  empsignin,
  adminsignin,
  adminsignup,
  adminupdate,
  getadmindata,
} = require("../../controller/auth.con");

const app = require("express").Router();

app.post("/employesignin", empsignin);
app.post("/adminsignin", adminsignin);
app.post("/adminsignup", adminsignup);
app.put("/adminupdate/:id", adminupdate);
app.get("/admindatas/:id", getadmindata);

module.exports = app;
