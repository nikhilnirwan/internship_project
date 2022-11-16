let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const generate = require('./../../helper/otp')
const email = require('./../../helper/email')
const config = require('./../../config.json');
const MESSAGES = require('./../../helper/customMessages')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const _ = require("lodash");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");
const userController = require("../../controller/user.controller");
const User = mongoose.model("User");
const Leaves = mongoose.model("Leaves");
const LeavesMaster = mongoose.model("LeavesMaster");
const moment = require('moment');

module.exports = {
    applyLeave: (userId, data) => {
        return new Promise(async (resolve, reject) => {
            const { approvedBy } = data;
            if (moment(data.leaveFrom).diff(moment(data.leaveTo), 'days') > 0) {
                reject('LeaveTo date should not me less than LeaveFrom')
            } else if (moment(data.leaveFrom).diff(moment(), 'days') >= 0) {
                const users = await User.find({ _id: { $in: approvedBy } }, { email: 1 });
                const senderData = await User.findOne({ _id: userId });
                const leavesType = await LeavesMaster.findOne({ _id: data.leaveType });
                const userEmails = users.map(ele => ele.email);
                const leaveData = { ...data };
                if (leavesType && leavesType.leaveCanAprrovedAfterDays == 0) {
                    leaveData['approvalStatus'] = 'Approved';
                    leaveData['approvalFrom'] = [{ name: 'Auto Approved', comment: 'Your Leave has been Approved by the system.' }];
                }
                if (leavesType.leaveCanAprrovedAfterDays && moment(data.leaveFrom).diff(moment(), 'days') <= leavesType.leaveCanAprrovedAfterDays) {
                    reject(`You Cannot apply ${leavesType.name} before ${leavesType.leaveCanAprrovedAfterDays} days from now`)
                } else {
                    let levaes = new Leaves(leaveData);
                    let response = await levaes.save()
                    if (response) {
                        let subject = `${leavesType.name} application`;
                        let body = `Dear Sir/Madam <br/><br/>
                ${leavesType.leaveCanAprrovedAfterDays == 0 ? 'This Leave is auto approved by the system <br/> <br/>' : ''}
                 ${leavesType.name} Application From ${senderData.firstName} ${senderData.middelName} ${senderData.lastName} 
                 <br/><br/>
                Leave Need From ${moment(leaveData.leaveFrom).format('DD MM YYYY')} to ${moment(leaveData.leaveTo).format('DD MM YYYY')}
                 <br/><br/><b>Reason</b> : ${leaveData.reason}`
                        email.sendMail(userEmails, subject, body);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }
            } else {
                reject("LeaveFrom should be future Date")
            }
        })
    }
}