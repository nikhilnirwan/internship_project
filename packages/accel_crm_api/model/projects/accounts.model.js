const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Accounts = new Schema({
    beneficiaryName: String,
    beneficiaryAccountNumber: String,
    bankNameAndAddress: String,
    bankType: String,
    ifscNumber: String,
    PAN: String,
    LUT: String,
    GST: String,
    CIN: String,
    state: String,
    city: String,
    zipCode: String,
    addressLine1: String,
    addressLine2: String,
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Accounts', Accounts);