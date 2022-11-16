let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const generate = require('../../helper/otp')
const email = require('../../helper/email')
const config = require('../../config.json');
const MESSAGES = require('../../helper/customMessages')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const _ = require("lodash");
const mongoose = require("mongoose");
const LeavesMaster = mongoose.model("LeavesMaster");

let authController = require("../../controller/auth");


router.get('/', async (req, res) => {
  const resData = await commonController.getAll(LeavesMaster)
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.get('/:id', async (req, res) => {
  const resData = await commonController.getOne(LeavesMaster, { _id: req.params.id });
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.post('/', async (req, res) => {
  const resData = await commonController.add(LeavesMaster, req.body);
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.put('/:id', async (req, res) => {
  const resData = await commonController.updateBy(LeavesMaster, req.params.id, req.body);
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.delete('/:id', async (req, res) => {
  const resData = await commonController.delete(LeavesMaster, req.params.id);
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

module.exports = router;
