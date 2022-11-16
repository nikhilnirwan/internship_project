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
const User = mongoose.model("User");
const auth = require("../../helper/auth");
const userController = require("../../controller/user.controller");
let authController = require("../../controller/auth");


router.get('/', async (req, res) => {
  const resData = await commonController.getWithSortByPopulate(User, 'role')
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.get('/:comboKey/list', async (req, res) => {
  const resData = await userController.getUsersBy(req.params.comboKey)
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

// router.get('/employees/list', async (req, res) => {
//   const resData = await userController.getEmployees()
//   if (resData) {
//     response.successResponse(res, 200, resData);
//   } else {
//     response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
//   }
// })

router.get('/:id', async (req, res) => {
  const resData = await commonController.getOne(User, { _id: req.params.id });
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.post('/', async (req, res) => {
  req.body['password'] = generate.generatePassword(6);
  const resData = await authController.register(req.body);
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.put('/:id', async (req, res) => {
  const resData = await commonController.updateBy(User, req.params.id, req.body);
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.delete('/:id', async (req, res) => {
  const resData = await commonController.delete(User, req.params.id);
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.get('/birthday/list', async (req, res) => {
  const resData = await userController.getBirthday()
  if (resData) {
    response.successResponse(res, 200, resData);
  } else {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})


module.exports = router;
