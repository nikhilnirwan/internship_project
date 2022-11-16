const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Holiday = new Schema({
    name: String,
    holidayOn: Date,
    file: String,
    description: String,
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Holiday', Holiday);