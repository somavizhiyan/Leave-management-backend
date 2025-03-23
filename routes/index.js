
const app = require("express").Router();

app.use("/auth", require("./v1/auth"));
app.use("/department",require("./v1/department"));
app.use("/employe", require("./v1/employe"));
app.use("/leavetype",require("./v1/leavetype"))
app.use("/leaverequest",require("./v1/leaverequest"))

module.exports = app;
