let log = require("../helper/logger");
let response = require("../helper/response");
const commonController = require("../controller/commonController");
const ERRORS = require("../helper/errorMessage");
const generate = require('./../helper/otp')
const email = require('./../helper/email')
const config = require('./../config.json');
const MESSAGES = require('./../helper/customMessages')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const _ = require("lodash");
const mongoose = require("mongoose");
const auth = require("../helper/auth");
const MapDesignations = mongoose.model("MapDesignations");
const User = mongoose.model("User");
const moment = require('moment');

module.exports = {
    getUsersBy: (key) => {
        return new Promise(async (resolve, reject) => {
            let mapDesignations = await MapDesignations.findOne({ comboKey: key, status: { $ne: 'deleted' } }, { role: 1 })
            if (mapDesignations) {
                User.find({ role: { $in: mapDesignations.role }, status: { $ne: 'deleted' } }).then(resData => {
                    resolve(resData)
                }).catch(error => {
                    reject(error)
                })
            } else {
                resolve([])
            }
        })
    },
    getBirthday: () => {
        return new Promise(async (resolve, reject) => {
            let userList = await User.find({
                status: { $ne: 'deleted' },
                $expr: {
                    $and: [{ "$eq": [{ "$month": "$dob" }, parseInt(moment().format('M'))] },
                    { "$gte": [{ "$dayOfMonth": "$dob" }, parseInt(moment().format('DD'))] }]
                }
            }).sort({ dob: -1 })
            if (userList && userList.length) {
                resolve(userList)
            } else {
                resolve([])
            }
        })
    }
}