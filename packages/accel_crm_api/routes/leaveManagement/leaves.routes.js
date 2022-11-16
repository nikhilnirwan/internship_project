let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const leaveController = require("../../controller/leaves/leave.controller");

const ERRORS = require("../../helper/errorMessage");
const generate = require('../../helper/otp')
const email = require('../../helper/email')
const config = require('../../config.json');
const MESSAGES = require('../../helper/customMessages')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const _ = require("lodash");
const mongoose = require("mongoose");
const Leaves = mongoose.model("Leaves");

let authController = require("../../controller/auth");


router.get('/', async (req, res) => {
  const resData = await commonController.getWithSortByPopulate(Leaves, ['approvedBy', 'leaveType'])
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.get('/:id', async (req, res) => {
  const resData = await commonController.getOne(Leaves, { _id: req.params.id });
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.post('/', async (req, res) => {
  leaveController.applyLeave(req.userId, req.body).then(resData => {
    response.successResponse(res, 200, resData);
  }).catch(error => {
    response.errorMsgResponse(res, 301, error);
  })
})

router.put('/:id', async (req, res) => {
  const resData = await commonController.updateBy(Leaves, req.params.id, req.body);
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.delete('/:id', async (req, res) => {
  const resData = await commonController.delete(Leaves, req.params.id);
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

module.exports = router;
