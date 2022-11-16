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
const auth = require("../../helper/auth");

const Projects = mongoose.model("Projects");
const InvoiceJobs = mongoose.model("InvoiceJobs");


router.get('/', async (req, res) => {
    let resData;
    resData = await commonController.getWithSortByPopulate(InvoiceJobs, ['billFrom', 'billTo', 'developers']);
    // resData = await invoiceJobController.getInvoices();

    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.get('/invoices/from/masters', async (req, res) => {
    let resData;
    resData = await commonController.getAll(InvoiceJobs);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})


router.get('/:id', async (req, res) => {
    const resData = await commonController.getOne(InvoiceJobs, { _id: req.params.id });
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.post('/', async (req, res) => {
    const resData = await commonController.add(InvoiceJobs, req.body);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.put('/:id', async (req, res) => {
    const resData = await commonController.updateBy(InvoiceJobs, req.params.id, req.body);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})

router.delete('/:id', async (req, res) => {
    const resData = await commonController.delete(InvoiceJobs, req.params.id);
    if (resData) {
        response.successResponse(res, 200, resData);
    } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    }
})


module.exports = router;