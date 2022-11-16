const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const LeavesMaster = new Schema(
    {
        name: String,
        leaveCanAprrovedAfterDays: Number,
        LeaveCanTakeInAYear: Number,
        leaveTemplate: String,
        status: {
            type: String,
            default: "active",
        }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("LeavesMaster", LeavesMaster);
