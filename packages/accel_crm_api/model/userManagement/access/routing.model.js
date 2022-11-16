const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Routing = new Schema({
    name: String,
    parentMenu: String,
    componentName: String,
    subparentMenu: String,
    routeUrl: String,
    icon: String,
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Routing', Routing);