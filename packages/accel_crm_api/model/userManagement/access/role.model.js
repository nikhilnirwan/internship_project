const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Roles = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Roles', Roles);