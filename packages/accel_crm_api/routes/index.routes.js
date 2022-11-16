let authRoute = require("./auth.routes");
let userRoute = require("./userManagement/user.routes");
let uploadRoute = require("./upload.routes");
let userProfile = require("./userManagement/user.profile.routes");
let access = require("./userManagement/access/access.routes");
let role = require("./userManagement/access/role.routes");
let routing = require("./userManagement/access/routing.routes");
let projects = require("./projects/projects.routes");
let invoiceJobs = require("./projects/invoiceJobs.routes");
let invoiceMaster = require("./projects/invoiceMaster.routes");
let accounts = require("./projects/accounts.routes");
let salaryManagement = require("./salaryManagement/salaryManagement.routes");
let mapdesignations = require("./userManagement/mapdesignations.routes");
let invoiceCrons = require("./../schedulers/invoiceCrons");
let holiday = require('./holidayManagement/holiday.route');
let leaves = require('./leaveManagement/leaves.routes');
let leavesMaster = require('./leaveManagement/leavesMaster.routes');




module.exports = (app) => {
  const auth = require("../helper/auth");
  app.use("/api/authentication", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/upload", uploadRoute);
  app.use("/api/userprofile", userProfile);
  app.use("/api/role", auth, role);
  app.use("/api/access", auth, access);
  app.use("/api/routing", auth, routing);
  app.use("/api/projects", auth, projects);
  app.use("/api/invoiceJobs", auth, invoiceJobs);
  app.use("/api/invoiceMaster", auth, invoiceMaster);
  app.use("/api/accounts", auth, accounts);
  app.use("/api/salaries", auth, salaryManagement);
  app.use("/api/map-designation", auth, mapdesignations);
  app.use("/api/holiday", auth, holiday);
  app.use("/api/leaves", auth, leaves);
  app.use("/api/leaveMaster", auth, leavesMaster);


  app.get("/api/testcron", (req, res) => {
    invoiceCrons.sendInvoice().then(resData => {
      res.send(resData)
    })
  })

};