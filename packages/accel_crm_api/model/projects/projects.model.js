const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Projects = new Schema({
    company: String,
    name: String,
    clientName: String,
    clientEmail: String,
    description: String,
    endDate: String,
    projectLink: String,
    startDate: String,
    GSTN: String,
    state: String,
    city: String,
    zipCode: String,
    addressLine1: String,
    addressLine2: String,
    clientDeclaration: String,
    clientDiscriptions: String,
    SAC: String,
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Projects', Projects);