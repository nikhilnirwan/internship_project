const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Access = new Schema({
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'Roles'
    },
    routing: {
        type: mongoose.Types.ObjectId,
        ref: 'Routing'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    page: String,
    view: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Access', Access);