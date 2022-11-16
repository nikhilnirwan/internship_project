let log = require("../helper/logger");
let response = require("../helper/response");
const commonController = require("../controller/commonController");
const ERRORS = require("../helper/errorMessage");
const generate = require('../helper/otp')
const email = require('../helper/email')
const invoiceConfig = require('./pdfContents/invoice')

const config = require('../config.json');
const MESSAGES = require('../helper/customMessages')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const _ = require("lodash");
const mongoose = require("mongoose");
const auth = require("../helper/auth");
const userController = require("../controller/user.controller");
const User = mongoose.model("User");
const InvoiceMaster = mongoose.model("InvoiceMaster");
const InvoiceJobs = mongoose.model("InvoiceJobs");
const moment = require('moment');
const pdfMaker = require('pdfmake/src/printer');
const fs = require('fs');
var pdfmake = require('pdfmake');

const pdfFonts = require('pdfmake/build/vfs_fonts');
const htmlForm = require('html-to-pdfmake');
const path = require('path');


module.exports = {
    getInvoices: () => {
        return new Promise(async (resolve, reject) => {
            let invoiceJobsRoleId = await InvoiceJobs.find({ status: { $ne: 'deleted' }, $expr: { "$eq": [{ "$month": "$startDate" }, parseInt(moment().format('M'))] } });
            let invoiceMaster = await InvoiceMaster.find({ status: { $ne: 'deleted' }, $expr: { "$eq": [{ "$month": "$startDate" }, parseInt(moment().format('M'))] } });
            let invoiceMasterIds = invoiceJobsRoleId.map(ele => ele.invoiceMaster);
            invoiceMaster.forEach(async (ele) => {
                if (!invoiceMasterIds.find(invoice => invoice.toString() == ele._id.toString())) {
                    let objectData = {
                        invoiceMaster: ele._id,
                        billFrom: ele.billFrom,
                        billTo: ele.billTo,
                        developers: ele.developers,
                        price: ele.price,
                        leaves: ele.leaves,
                        bonus: ele.bonus,
                        tds: ele.tds,
                        GST: ele.GST,
                        startDate: ele.startDate,
                        endDate: ele.endDate,
                        sendImmediate: ele.sendImmediate,
                        isSchedule: ele.isSchedule
                    }
                    let invoiceJobs = new InvoiceJobs(objectData);
                    let resp = await invoiceJobs.save();
                }
            })
        })
    },
    sendInvoice: () => {
        return new Promise(async (resolve, reject) => {
            console.log("--------------",
                moment().startOf('day'),
                moment(moment().startOf('day')).endOf('day').toDate()
            )
            let invoiceToSend = await InvoiceJobs.find({
                status: { $ne: 'deleted' },
                endDate: {
                    $gte: moment().startOf('day').toDate(),
                    $lt: moment(moment().startOf('day')).endOf('day').toDate()
                }
            }).populate('developers').populate('billFrom').populate('billTo');
            module.exports.generatePdf(invoiceConfig(invoiceToSend[1]), path.join(__dirname, '../public/invoices/', Date.now().toString() + '.pdf'))
            resolve({ ...invoiceConfig(invoiceToSend[0]) })
        })
    },
    generatePdf: (movies, name) => {
        return new Promise((resolve, reject) => {
            const doc = new pdfmake({
                Roboto: {
                    normal: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
                    bold: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
                    bolditalics: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64')
                }
            }).createPdfKitDocument(movies)
            var chunks = [];
            var result;
            doc.on('readable', function () {
                var chunk;
                while ((chunk = doc.read(9007199254740991)) !== null) {
                    chunks.push(chunk);
                }
            });
            doc.pipe(fs.createWriteStream(name));
            doc.on('end', function () {
                result = Buffer.concat(chunks);
                resolve(result)
            });
            doc.end();
        });
    },


}
