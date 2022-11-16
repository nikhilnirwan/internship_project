let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const generate = require('./../../helper/otp')
const email = require('./../../helper/email')
const config = require('./../../config.json');
const MESSAGES = require('./../../helper/customMessages')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const _ = require("lodash");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");
const userController = require("../../controller/user.controller");
const User = mongoose.model("User");
const InvoiceMaster = mongoose.model("InvoiceMaster");
const InvoiceJobs = mongoose.model("InvoiceJobs");
const moment = require('moment');
module.exports = {
}