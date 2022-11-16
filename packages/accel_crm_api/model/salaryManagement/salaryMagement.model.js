const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SalaryMagement = new Schema({
    employee: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    beneficiaryAccountNumber: String,
    bankName: String,
    bankNameAndAddress: String,
    accountType: String,
    ifscNumber: String,
    salaryPerMonth: Number,
    salaryIncrements: [
        {
            increaseBy: Number,
            increemntOn: Date
        }
    ],
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('SalaryMagement', SalaryMagement);