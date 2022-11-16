const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const InvoiceMaster = new Schema({
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
module.exports = mongoose.model('InvoiceMaster', InvoiceMaster);