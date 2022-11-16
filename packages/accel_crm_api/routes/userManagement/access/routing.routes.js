let router = require("express").Router();
let log = require("../../../helper/logger");
let response = require("../../../helper/response");
const commonController = require("../../../controller/commonController");
const ERRORS = require("../../../helper/errorMessage");
const generate = require('../../../helper/otp')
const email = require('../../../helper/email')
const config = require('../../../config.json');
const MESSAGES = require('../../../helper/customMessages')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const _ = require("lodash");
const mongoose = require("mongoose");
const auth = require("../../../helper/auth");
const Routing = mongoose.model("Routing");
const Access = mongoose.model("Access");

router.get('/', async (req, res) => {
    let resData;
    if (req.designation == 'Admin') {
        resData = await commonController.getAll(Routing);
    } else {
        let roleId = req.role;
        let resultAccess = await commonController.getBy(Access, { role: roleId });
        let routingIds = resultAccess.filter(ele => ele.view).map(ele => ele.routing);
        resData = await commonController.getBy(Routing, { _id: { $in: routingIds } });
    }
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.get('/:id', async (req, res) => {
    const resData = await commonController.getOne(Routing, { _id: req.params.id });
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.post('/', async (req, res) => {
    const resData = await commonController.add(Routing, req.body);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.put('/:id', async (req, res) => {
    const resData = await commonController.updateBy(Routing, req.params.id, req.body);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.delete('/:id', async (req, res) => {
    const resData = await commonController.delete(Routing, req.params.id);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})


module.exports = router;