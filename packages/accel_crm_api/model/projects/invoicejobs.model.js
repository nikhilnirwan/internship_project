const config = require('./../../config.json')
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection)

const InvoiceJobs = new Schema({
    invoiceNumber: {
        type: Number
    },
    invoiceMaster: {
        type: mongoose.Types.ObjectId,
        ref: 'InvoiceMaster'
    },
    billFrom: {
        type: mongoose.Types.ObjectId,
        ref: 'Accounts'
    },
    billTo: {
        type: mongoose.Types.ObjectId,
        ref: 'Projects'
    },
    developers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    price: {
        type: Number,
        default: 0
    },
    leaves: {
        type: Number,
        default: 0
    },
    bonus: {
        type: Number,
        default: 0
    },
    tds: {
        type: Number,
        default: 0
    },
    GST: {
        type: Number,
        default: 0
    },
    invoiceFile: String,
    startDate: Date,
    endDate: Date,
    sendImmediate: String,
    isSchedule: String,
    invoiceSent: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
InvoiceJobs.plugin(autoIncrement.plugin, {
    model: 'InvoiceJobs',
    field: 'invoiceNumber',
    startAt: 250,
    incrementBy: 1
});
module.exports = mongoose.model('InvoiceJobs', InvoiceJobs);