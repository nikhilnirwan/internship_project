const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Leaves = new Schema(
    {
        leaveFrom: Date,
        leaveTo: Date,
        approvedBy: [{
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }],
        leaveType: {
            type: mongoose.Types.ObjectId,
            ref: 'LeavesMaster'
        },
        reason: String,
        approvalStatus: {
            type: String,
            enum: ['Approved', 'In-Progress', 'Rejected'],
            default: 'In-Progress'
        },
        approvalFrom: [
            {
                name: String,
                comment: String
            }
        ],
        status: {
            type: String,
            default: "active",
        }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Leaves", Leaves);
