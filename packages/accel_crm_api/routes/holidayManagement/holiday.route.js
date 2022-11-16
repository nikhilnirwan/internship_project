let router = require("express").Router();
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const _ = require("lodash");
const mongoose = require("mongoose");
const Holiday = mongoose.model("Holiday");
const moment = require('moment');

router.get('/', async (req, res) => {
    let resData;
    resData = await commonController.getAll(Holiday);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.get('/upcomming/holiday', async (req, res) => {
    let search = {
        $expr: {
            $and: [
                // { "$gte": [{ "$month": "$holidayOn" }, parseInt(moment().format('M'))] },
                // { "$gte": [{ "$dayOfMonth": "$holidayOn" }, parseInt(moment().format('DD'))] },
                { "$eq": [{ "$year": "$holidayOn" }, parseInt(moment().format('YYYY'))] }
            ]
        }
    }
    let resData = await commonController.getBy(Holiday, search);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.get('/:id', async (req, res) => {
    const resData = await commonController.getOne(Holiday, { _id: req.params.id });
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.post('/', async (req, res) => {
    const resData = await commonController.add(Holiday, req.body);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.put('/:id', async (req, res) => {
    const resData = await commonController.updateBy(Holiday, req.params.id, req.body);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.delete('/:id', async (req, res) => {
    const resData = await commonController.delete(Holiday, req.params.id);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})


module.exports = router;